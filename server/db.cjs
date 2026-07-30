const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'tuagente.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'agent',
    avatar TEXT,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    operation TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'PEN',
    description TEXT,
    bedrooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    area REAL DEFAULT 0,
    parking INTEGER DEFAULT 0,
    address TEXT,
    district TEXT,
    city TEXT DEFAULT 'Lima',
    lat REAL,
    lng REAL,
    status TEXT DEFAULT 'available',
    featured INTEGER DEFAULT 0,
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS property_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    is_primary INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT DEFAULT 'General',
    author TEXT DEFAULT 'Equipo TUAGENTE.PE',
    readTime TEXT DEFAULT '5 min',
    status TEXT DEFAULT 'published',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed admin user if not exists
const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@tuagente.pe');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `).run('Administrador', 'admin@tuagente.pe', hashedPassword, 'admin');
  console.log('Admin user created: admin@tuagente.pe / admin123');
}

// Seed demo properties if table is empty
const propCount = db.prepare('SELECT COUNT(*) as count FROM properties').get();
if (propCount.count === 0) {
  const demoProperties = [
    { category: 'Casas', operation: 'Comprar', name: 'Casa Moderna Surco', price: 450000, description: 'Casa moderna con acabados de primera en Santiago de Surco.', bedrooms: 3, bathrooms: 2, area: 180, parking: 2, address: 'Av. del Parque 505', district: 'Santiago de Surco', featured: 1 },
    { category: 'Casas', operation: 'Alquilar', name: 'Casa Familiar La Molina', price: 3500, description: 'Casa familiar con amplio jardín y piscina en La Molina.', bedrooms: 4, bathrooms: 3, area: 250, parking: 2, address: 'Calle Los Robles 404', district: 'La Molina', featured: 0 },
    { category: 'Departamentos', operation: 'Comprar', name: 'Departamento Vista Mar Miraflores', price: 320000, description: 'Departamento de lujo con vista al Pacífico en Miraflores.', bedrooms: 3, bathrooms: 2, area: 120, parking: 2, address: 'Calle Malecón 707', district: 'Miraflores', featured: 1 },
    { category: 'Departamentos', operation: 'Alquilar', name: 'Departamento Acogedor Miraflores', price: 2200, description: 'Departamento acogedor en zona céntrica de Miraflores.', bedrooms: 2, bathrooms: 1, area: 70, parking: 1, address: 'Av. Larco 606', district: 'Miraflores', featured: 0 },
    { category: 'Oficinas', operation: 'Comprar', name: 'Oficina Corporativa San Isidro', price: 280000, description: 'Oficina premium en zona financiera de San Isidro.', bedrooms: 0, bathrooms: 2, area: 100, parking: 3, address: 'Av. Ejército 101', district: 'San Isidro', featured: 1 },
    { category: 'Oficinas', operation: 'Alquilar', name: 'Oficina Moderna San Isidro', price: 4500, description: 'Oficina moderna con todos los servicios en San Isidro.', bedrooms: 0, bathrooms: 1, area: 60, parking: 1, address: 'Calle San Felipe 789', district: 'San Isidro', featured: 0 },
    { category: 'Locales Comerciales', operation: 'Comprar', name: 'Local Comercial Centro Lima', price: 180000, description: 'Local con frente a principal avenida comercial.', bedrooms: 0, bathrooms: 1, area: 80, parking: 1, address: 'Av. La Marina 303', district: 'San Miguel', featured: 1 },
    { category: 'Locales Comerciales', operation: 'Alquilar', name: 'Local Tienda Miraflores', price: 5000, description: 'Local comercial en zona de alto tránsito peatonal.', bedrooms: 0, bathrooms: 1, area: 45, parking: 0, address: 'Jr. de la Unión 202', district: 'Miraflores', featured: 0 },
    { category: 'Lotes y Terrenos', operation: 'Comprar', name: 'Lote Residencial Surco', price: 250000, description: 'Terreno con excelente ubicación para desarrollo residencial.', bedrooms: 0, bathrooms: 0, area: 400, parking: 0, address: 'Jr. Los Olivos 456', district: 'Santiago de Surco', featured: 1 },
    { category: 'Lotes y Terrenos', operation: 'Alquilar', name: 'Lote Comercial Ate', price: 1500, description: 'Lote en zona en crecimiento, ideal para desarrollo comercial.', bedrooms: 0, bathrooms: 0, area: 500, parking: 0, address: 'Av. Principal 123', district: 'Ate', featured: 0 },
  ];

  const insertProperty = db.prepare(`
    INSERT INTO properties (category, operation, name, price, description, bedrooms, bathrooms, area, parking, address, district, featured, user_id)
    VALUES (@category, @operation, @name, @price, @description, @bedrooms, @bathrooms, @area, @parking, @address, @district, @featured, 1)
  `);

  const insertImage = db.prepare(`
    INSERT INTO property_images (property_id, image_url, is_primary, sort_order)
    VALUES (?, ?, ?, ?)
  `);

  const imageMap = {
    'Casa Moderna Surco': ['casa-88.jpg', 'casa-88-2.jpg', 'casa-88-3.jpg'],
    'Casa Familiar La Molina': ['casa-95.jpg', 'casa-95-2.jpg', 'casa-95-3.jpg'],
    'Departamento Vista Mar Miraflores': ['departamento-22.jpg', 'departamento-22-2.jpg', 'departamento-22-3.jpg'],
    'Departamento Acogedor Miraflores': ['departamento-34.jpg', 'departamento-34-2.jpg', 'departamento-34-3.jpg'],
    'Oficina Corporativa San Isidro': ['oficina-19.jpg', 'oficina-19-2.jpg', 'oficina-19-3.jpg'],
    'Oficina Moderna San Isidro': ['oficina-41.jpg', 'oficina-41-2.jpg', 'oficina-41-3.jpg'],
    'Local Comercial Centro Lima': ['local-27.jpg', 'local-27-2.jpg', 'local-27-3.jpg'],
    'Local Tienda Miraflores': ['local-18.jpg', 'local-18-2.jpg', 'local-18-3.jpg'],
    'Lote Residencial Surco': ['lote-40.jpg', 'lote-40-2.jpg', 'lote-40-3.jpg'],
    'Lote Comercial Ate': ['lote-31.jpg', 'lote-31-2.jpg', 'lote-31-3.jpg'],
  };

  const insertMany = db.transaction(() => {
    for (const prop of demoProperties) {
      const result = insertProperty.run(prop);
      const images = imageMap[prop.name] || [];
      images.forEach((img, idx) => {
        insertImage.run(result.lastInsertRowid, `/images/properties/${img}`, idx === 0 ? 1 : 0, idx);
      });
    }
  });

  insertMany();
  console.log('Demo properties seeded');
}

// Seed demo blog posts if table is empty
const blogCount = db.prepare('SELECT COUNT(*) as count FROM blog_posts').get();
if (blogCount.count === 0) {
  const demoPosts = [
    {
      slug: 'santiago-de-surco',
      title: 'Santiago de Surco: El distrito familiar por excelencia en Lima',
      excerpt: 'Descubre por qué Santiago de Surco es el distrito preferido para familias que buscan calidad de vida en Lima.',
      content: '<p>Santiago de Surco se ha consolidado como uno de los distritos más buscados de Lima para familias. Con una excelente infraestructura, parques y centros educativos de primer nivel, este distrito ofrece todo lo que una familia necesita.</p><h2>¿Por qué elegir Santiago de Surco?</h2><h3>Calidad de Vida</h3><p>Santiago de Surco cuenta con amplias zonas verdes, parques modernos y una excelente conectividad vial. Los residentes disfrutan de un ambiente seguro y familiar.</p><h3>Educación</h3><p>El distrito alberga algunos de los mejores colegios e instituciones educativas de Lima, incluyendo colegios bilingües e internacionales.</p><h3>Comercio y Servicios</h3><p>La avenida La Marina y la avenida Benavides ofrecen una amplia variedad de tiendas, restaurantes y centros comerciales.</p>',
      image: '/images/blog/santiago-surco.jpg',
      category: 'Zonas',
      author: 'Equipo TUAGENTE.PE',
      readTime: '5 min',
    },
    {
      slug: 'consejos-comprar-vivienda',
      title: '5 Consejos vitales antes de comprar tu primera vivienda en Lima',
      excerpt: 'Guía completa para primeros compradores de vivienda en la capital peruana.',
      content: '<p>Comprar tu primera vivienda es una de las decisiones más importantes de tu vida. Aquí te compartimos 5 consejos esenciales para que tomes la mejor decisión.</p><h2>1. Define tu presupuesto</h2><p>Antes de empezar a buscar, es fundamental saber cuánto puedes invertir. Considera no solo el precio de venta, sino también los gastos adicionales como impuestos, escrituras y posible remodelación.</p><h2>2. Elige la ubicación correcta</h2><p>La ubicación es clave en una inversión inmobiliaria. Considera factores como proximidad a tu lugar de trabajo, acceso a transporte público, servicios cercanos y seguridad de la zona.</p><h2>3. Revisa la documentación</h2><p>Asegúrate de que la propiedad tenga toda la documentación en orden: título de propiedad, certificado de gravámenes, pagos de impuestos al día y planos aprobados.</p><h2>4. No te apresures</h2><p>Tomate tu tiempo para visitar varias opciones. No compres la primera propiedad que veas sin antes comparar con otras alternativas.</p><h2>5. Busca asesoría profesional</h2><p>Un buen agente inmobiliario puede guiarte en todo el proceso y ayudarte a evitar errores costosos.</p>',
      image: '/images/blog/consejos-compra.jpg',
      category: 'Consejos',
      author: 'Equipo TUAGENTE.PE',
      readTime: '7 min',
    },
  ];

  const insertBlog = db.prepare(`
    INSERT INTO blog_posts (slug, title, excerpt, content, image, category, author, readTime)
    VALUES (@slug, @title, @excerpt, @content, @image, @category, @author, @readTime)
  `);

  const insertBlogs = db.transaction(() => {
    for (const post of demoPosts) {
      insertBlog.run(post);
    }
  });

  insertBlogs();
  console.log('Demo blog posts seeded');
}

module.exports = db;
