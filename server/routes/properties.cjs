const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db.cjs');
const { authenticate, authorize } = require('../middleware/auth.cjs');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../public/images/properties');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Solo se permiten imágenes (jpg, png, webp)'));
  }
});

// Helper: delete image file from disk
function deleteImageFile(imageUrl) {
  if (!imageUrl) return;
  // imageUrl = "/images/properties/abc.jpg"
  const filePath = path.join(__dirname, '../../public', imageUrl);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// Helper: delete all image files for a property
function deleteAllPropertyImages(propertyId) {
  const images = db.prepare('SELECT image_url FROM property_images WHERE property_id = ?').all(propertyId);
  images.forEach(img => deleteImageFile(img.image_url));
  db.prepare('DELETE FROM property_images WHERE property_id = ?').run(propertyId);
}

// Get all properties (public)
router.get('/', (req, res) => {
  const { category, operation, district, search, featured, limit } = req.query;

  let query = `
    SELECT p.*,
      (SELECT image_url FROM property_images WHERE property_id = p.id AND is_primary = 1 LIMIT 1) as primary_image,
      (SELECT GROUP_CONCAT(image_url ORDER BY sort_order) FROM property_images WHERE property_id = p.id) as all_images,
      u.name as agent_name
    FROM properties p
    LEFT JOIN users u ON p.user_id = u.id
  `;

  const conditions = [];
  const params = [];

  if (category && category !== 'all') {
    conditions.push('p.category = ?');
    params.push(category);
  }
  if (operation) {
    conditions.push('p.operation = ?');
    params.push(operation);
  }
  if (district) {
    conditions.push('p.district = ?');
    params.push(district);
  }
  if (featured === '1') {
    conditions.push('p.featured = 1');
  }
  if (search) {
    conditions.push('(p.name LIKE ? OR p.description LIKE ? OR p.district LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY p.created_at DESC';

  if (limit) {
    query += ' LIMIT ?';
    params.push(parseInt(limit));
  }

  const properties = db.prepare(query).all(...params);

  const formatted = properties.map(p => ({
    ...p,
    images: p.all_images ? p.all_images.split(',') : [],
    image: p.primary_image || (p.all_images ? p.all_images.split(',')[0] : null),
    features: { bedrooms: p.bedrooms, bathrooms: p.bathrooms, area: p.area, parking: p.parking },
    location: { address: p.address, district: p.district, city: p.city, coordinates: { lat: p.lat, lng: p.lng } },
    priceDisplay: `S/${p.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`,
  }));

  res.json(formatted);
});

// Get single property
router.get('/:id', (req, res) => {
  const property = db.prepare(`
    SELECT p.*, u.name as agent_name, u.phone as agent_phone, u.email as agent_email
    FROM properties p
    LEFT JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `).get(req.params.id);

  if (!property) {
    return res.status(404).json({ error: 'Propiedad no encontrada.' });
  }

  const images = db.prepare('SELECT id, image_url, is_primary FROM property_images WHERE property_id = ? ORDER BY sort_order').all(req.params.id);

  res.json({
    ...property,
    images: images.map(i => i.image_url),
    imagesData: images, // include IDs for deletion
    image: images.length > 0 ? images[0].image_url : null,
    features: { bedrooms: property.bedrooms, bathrooms: property.bathrooms, area: property.area, parking: property.parking },
    location: { address: property.address, district: property.district, city: property.city, coordinates: { lat: property.lat, lng: property.lng } },
    priceDisplay: `S/${property.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`,
  });
});

// Create property (authenticated)
router.post('/', authenticate, upload.array('images', 10), (req, res) => {
  try {
    const { category, operation, name, price, description, bedrooms, bathrooms, area, parking, address, district, city, lat, lng, status, featured } = req.body;

    const result = db.prepare(`
      INSERT INTO properties (category, operation, name, price, description, bedrooms, bathrooms, area, parking, address, district, city, lat, lng, status, featured, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(category, operation, name, parseFloat(price), description, parseInt(bedrooms) || 0, parseInt(bathrooms) || 0, parseFloat(area) || 0, parseInt(parking) || 0, address, district, city || 'Lima', parseFloat(lat) || null, parseFloat(lng) || null, status || 'available', featured === 'true' || featured === '1' ? 1 : 0, req.user.id);

    if (req.files && req.files.length > 0) {
      const insertImage = db.prepare('INSERT INTO property_images (property_id, image_url, is_primary, sort_order) VALUES (?, ?, ?, ?)');
      req.files.forEach((file, idx) => {
        insertImage.run(result.lastInsertRowid, `/images/properties/${file.filename}`, idx === 0 ? 1 : 0, idx);
      });
    }

    res.json({ id: result.lastInsertRowid, message: 'Propiedad creada exitosamente.' });
  } catch (err) {
    console.error('Error creating property:', err);
    res.status(500).json({ error: 'Error al crear la propiedad.' });
  }
});

// Update property (authenticated)
router.put('/:id', authenticate, upload.array('images', 10), (req, res) => {
  try {
    const { category, operation, name, price, description, bedrooms, bathrooms, area, parking, address, district, city, lat, lng, status, featured, removeImages } = req.body;

    const existing = db.prepare('SELECT id FROM properties WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Propiedad no encontrada.' });
    }

    db.prepare(`
      UPDATE properties
      SET category=?, operation=?, name=?, price=?, description=?, bedrooms=?, bathrooms=?, area=?, parking=?, address=?, district=?, city=?, lat=?, lng=?, status=?, featured=?, updated_at=CURRENT_TIMESTAMP
      WHERE id=?
    `).run(category, operation, name, parseFloat(price), description, parseInt(bedrooms) || 0, parseInt(bathrooms) || 0, parseFloat(area) || 0, parseInt(parking) || 0, address, district, city || 'Lima', parseFloat(lat) || null, parseFloat(lng) || null, status || 'available', featured === 'true' || featured === '1' ? 1 : 0, req.params.id);

    // Remove images that were deleted by the user
    if (removeImages) {
      const urlsToRemove = JSON.parse(removeImages);
      urlsToRemove.forEach(url => {
        const img = db.prepare('SELECT id FROM property_images WHERE property_id = ? AND image_url = ?').get(req.params.id, url);
        if (img) {
          deleteImageFile(url);
          db.prepare('DELETE FROM property_images WHERE id = ?').run(img.id);
        }
      });
    }

    // Add newly uploaded images
    if (req.files && req.files.length > 0) {
      const existingCount = db.prepare('SELECT COUNT(*) as count FROM property_images WHERE property_id = ?').get(req.params.id).count;
      const insertImage = db.prepare('INSERT INTO property_images (property_id, image_url, is_primary, sort_order) VALUES (?, ?, ?, ?)');
      req.files.forEach((file, idx) => {
        const isPrimary = existingCount === 0 && idx === 0 ? 1 : 0;
        insertImage.run(req.params.id, `/images/properties/${file.filename}`, isPrimary, existingCount + idx);
      });
    }

    res.json({ message: 'Propiedad actualizada exitosamente.' });
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).json({ error: 'Error al actualizar la propiedad.' });
  }
});

// Delete property (authenticated) - also cleans up files
router.delete('/:id', authenticate, (req, res) => {
  try {
    deleteAllPropertyImages(parseInt(req.params.id));
    db.prepare('DELETE FROM properties WHERE id = ?').run(req.params.id);
    res.json({ message: 'Propiedad eliminada exitosamente.' });
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).json({ error: 'Error al eliminar la propiedad.' });
  }
});

// Delete single image from property
router.delete('/:id/images', authenticate, (req, res) => {
  try {
    const { imageUrl } = req.query;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Se requiere imageUrl.' });
    }

    const decodedUrl = decodeURIComponent(imageUrl);
    const img = db.prepare('SELECT id, image_url FROM property_images WHERE property_id = ? AND image_url = ?').get(req.params.id, decodedUrl);

    if (!img) {
      return res.status(404).json({ error: 'Imagen no encontrada.' });
    }

    deleteImageFile(img.image_url);
    db.prepare('DELETE FROM property_images WHERE id = ?').run(img.id);

    // If deleted image was primary, set the next one as primary
    const wasPrimary = db.prepare('SELECT is_primary FROM property_images WHERE id = ?').get(img.id);
    if (!wasPrimary || wasPrimary.is_primary === 1) {
      const first = db.prepare('SELECT id FROM property_images WHERE property_id = ? ORDER BY sort_order LIMIT 1').get(req.params.id);
      if (first) {
        db.prepare('UPDATE property_images SET is_primary = 1 WHERE id = ?').run(first.id);
      }
    }

    res.json({ message: 'Imagen eliminada.' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Error al eliminar la imagen.' });
  }
});

module.exports = router;
