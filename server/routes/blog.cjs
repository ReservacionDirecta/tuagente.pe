const express = require('express');
const router = express.Router();
const db = require('../db.cjs');
const { authenticate, authorize } = require('../middleware/auth.cjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../public/images/blog');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp).'));
  },
});

router.get('/', (req, res) => {
  const { status } = req.query;
  let query = 'SELECT * FROM blog_posts';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';
  const posts = db.prepare(query).all(...params);
  res.json(posts);
});

router.get('/:idOrSlug', (req, res) => {
  let post = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.idOrSlug);
  if (!post) post = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.idOrSlug);
  if (!post) return res.status(404).json({ error: 'Artículo no encontrado.' });
  res.json(post);
});

router.post('/', authenticate, authorize('admin'), upload.single('image'), (req, res) => {
  const { slug, title, excerpt, content, category, author, readTime, status } = req.body;

  if (!slug || !title) {
    return res.status(400).json({ error: 'Slug y título son obligatorios.' });
  }

  const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug);
  if (existing) {
    return res.status(400).json({ error: 'Ya existe un artículo con ese slug.' });
  }

  const image = req.file ? `/images/blog/${req.file.filename}` : null;

  const result = db.prepare(`
    INSERT INTO blog_posts (slug, title, excerpt, content, image, category, author, readTime, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(slug, title, excerpt || '', content || '', image, category || 'General', author || 'Equipo TUAGENTE.PE', readTime || '5 min', status || 'published');

  res.status(201).json({ id: result.lastInsertRowid, message: 'Artículo creado.' });
});

router.put('/:id', authenticate, authorize('admin'), upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { slug, title, excerpt, content, category, author, readTime, status } = req.body;

  const existing = db.prepare('SELECT id, image FROM blog_posts WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Artículo no encontrado.' });

  if (slug) {
    const slugConflict = db.prepare('SELECT id FROM blog_posts WHERE slug = ? AND id != ?').get(slug, id);
    if (slugConflict) {
      return res.status(400).json({ error: 'Ya existe otro artículo con ese slug.' });
    }
  }

  let image = existing.image;
  if (req.file) {
    if (existing.image) {
      const oldPath = path.join(__dirname, '../../public', existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    image = `/images/blog/${req.file.filename}`;
  }

  db.prepare(`
    UPDATE blog_posts SET slug = ?, title = ?, excerpt = ?, content = ?, image = ?, category = ?, author = ?, readTime = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    slug || existing.slug, title, excerpt || '', content || '', image,
    category || 'General', author || 'Equipo TUAGENTE.PE', readTime || '5 min', status || 'published', id
  );

  res.json({ message: 'Artículo actualizado.' });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const existing = db.prepare('SELECT id, image FROM blog_posts WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Artículo no encontrado.' });

  if (existing.image) {
    const imgPath = path.join(__dirname, '../../public', existing.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
  res.json({ message: 'Artículo eliminado.' });
});

module.exports = router;
