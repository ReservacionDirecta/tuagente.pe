export const CATEGORIES = [
  'Casas',
  'Departamentos',
  'Oficinas',
  'Locales Comerciales',
  'Lotes y Terrenos',
];

export const OPERATIONS = ['Alquilar', 'Comprar'];

export const DISTRICTS = [
  'Santiago de Surco',
  'Miraflores',
  'San Isidro',
  'La Molina',
  'San Borja',
  'Jesús María',
  'Lince',
  'Pueblo Libre',
];

export const properties = [
  {
    id: 31,
    category: 'Lotes y Terrenos',
    operation: 'Alquilar',
    name: 'Lote Residencial en Surco',
    price: 1200,
    currency: 'PEN',
    priceDisplay: 'S/1,200.00',
    image: '/images/properties/lote-31.jpg',
    images: [
      '/images/properties/lote-31.jpg',
      '/images/properties/lote-31-2.jpg',
      '/images/properties/lote-31-3.jpg',
    ],
    description: 'Excelente lote para desarrollo residencial en zona en crecimiento.',
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 500,
      parking: 0,
    },
    location: {
      address: 'Av. Principal 123',
      district: 'Santiago de Surco',
      city: 'Lima',
      coordinates: { lat: -12.1464, lng: -76.9915 },
    },
    status: 'available',
    featured: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: 40,
    category: 'Lotes y Terrenos',
    operation: 'Comprar',
    name: 'Terreno en La Molina',
    price: 180000,
    currency: 'PEN',
    priceDisplay: 'S/180,000.00',
    image: '/images/properties/lote-40.jpg',
    images: [
      '/images/properties/lote-40.jpg',
      '/images/properties/lote-40-2.jpg',
      '/images/properties/lote-40-3.jpg',
    ],
    description: 'Terreno con excelente ubicación para construir tu hogar.',
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 300,
      parking: 0,
    },
    location: {
      address: 'Jr. Los Olivos 456',
      district: 'La Molina',
      city: 'Lima',
      coordinates: { lat: -12.0845, lng: -76.9432 },
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: 41,
    category: 'Oficinas',
    operation: 'Alquilar',
    name: 'Oficina en San Isidro',
    price: 950,
    currency: 'PEN',
    priceDisplay: 'S/950.00',
    image: '/images/properties/oficina-41.jpg',
    images: [
      '/images/properties/oficina-41.jpg',
      '/images/properties/oficina-41-2.jpg',
      '/images/properties/oficina-41-3.jpg',
    ],
    description: 'Oficina moderna en zona financiera con todos los servicios.',
    features: {
      bedrooms: 0,
      bathrooms: 1,
      area: 60,
      parking: 1,
    },
    location: {
      address: 'Calle San Felipe 789',
      district: 'San Isidro',
      city: 'Lima',
      coordinates: { lat: -12.0987, lng: -77.0285 },
    },
    status: 'available',
    featured: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
  {
    id: 19,
    category: 'Oficinas',
    operation: 'Comprar',
    name: 'Oficina Premium San Isidro',
    price: 245000,
    currency: 'PEN',
    priceDisplay: 'S/245,000.00',
    image: '/images/properties/oficina-19.jpg',
    images: [
      '/images/properties/oficina-19.jpg',
      '/images/properties/oficina-19-2.jpg',
      '/images/properties/oficina-19-3.jpg',
    ],
    description: 'Oficina con vista panorámica en edificio premium.',
    features: {
      bedrooms: 0,
      bathrooms: 1,
      area: 80,
      parking: 2,
    },
    location: {
      address: 'Av. Ejército 101',
      district: 'San Isidro',
      city: 'Lima',
      coordinates: { lat: -12.0945, lng: -77.0312 },
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
  {
    id: 18,
    category: 'Locales Comerciales',
    operation: 'Alquilar',
    name: 'Local Comercial Centro',
    price: 850,
    currency: 'PEN',
    priceDisplay: 'S/850.00',
    image: '/images/properties/local-18.jpg',
    images: [
      '/images/properties/local-18.jpg',
      '/images/properties/local-18-2.jpg',
      '/images/properties/local-18-3.jpg',
    ],
    description: 'Local comercial en zona de alto tránsito peatonal.',
    features: {
      bedrooms: 0,
      bathrooms: 1,
      area: 45,
      parking: 0,
    },
    location: {
      address: 'Jr. de la Unión 202',
      district: 'Cercado',
      city: 'Lima',
      coordinates: { lat: -12.0464, lng: -77.0425 },
    },
    status: 'available',
    featured: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: 27,
    category: 'Locales Comerciales',
    operation: 'Comprar',
    name: 'Local Comercial San Miguel',
    price: 165000,
    currency: 'PEN',
    priceDisplay: 'S/165,000.00',
    image: '/images/properties/local-27.jpg',
    images: [
      '/images/properties/local-27.jpg',
      '/images/properties/local-27-2.jpg',
      '/images/properties/local-27-3.jpg',
    ],
    description: 'Local con frente a principal avenida comercial.',
    features: {
      bedrooms: 0,
      bathrooms: 1,
      area: 60,
      parking: 1,
    },
    location: {
      address: 'Av. La Marina 303',
      district: 'San Miguel',
      city: 'Lima',
      coordinates: { lat: -12.0789, lng: -77.0854 },
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
  },
  {
    id: 95,
    category: 'Casas',
    operation: 'Alquilar',
    name: 'Casa con Jardín La Molina',
    price: 2200,
    currency: 'PEN',
    priceDisplay: 'S/2,200.00',
    image: '/images/properties/casa-95.jpg',
    images: [
      '/images/properties/casa-95.jpg',
      '/images/properties/casa-95-2.jpg',
      '/images/properties/casa-95-3.jpg',
    ],
    description: 'Casa familiar con amplio jardín y piscina.',
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      parking: 2,
    },
    location: {
      address: 'Calle Los Robles 404',
      district: 'La Molina',
      city: 'Lima',
      coordinates: { lat: -12.0823, lng: -76.9456 },
    },
    status: 'available',
    featured: false,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
  },
  {
    id: 88,
    category: 'Casas',
    operation: 'Comprar',
    name: 'Casa Moderna Surco',
    price: 320000,
    currency: 'PEN',
    priceDisplay: 'S/320,000.00',
    image: '/images/properties/casa-88.jpg',
    images: [
      '/images/properties/casa-88.jpg',
      '/images/properties/casa-88-2.jpg',
      '/images/properties/casa-88-3.jpg',
    ],
    description: 'Casa moderna con acabados de primera calidad.',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      parking: 2,
    },
    location: {
      address: 'Av. del Parque 505',
      district: 'Santiago de Surco',
      city: 'Lima',
      coordinates: { lat: -12.1423, lng: -76.9876 },
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-30',
    updatedAt: '2024-01-30',
  },
  {
    id: 34,
    category: 'Departamentos',
    operation: 'Alquilar',
    name: 'Departamento Miraflores',
    price: 1500,
    currency: 'PEN',
    priceDisplay: 'S/1,500.00',
    image: '/images/properties/departamento-34.jpg',
    images: [
      '/images/properties/departamento-34.jpg',
      '/images/properties/departamento-34-2.jpg',
      '/images/properties/departamento-34-3.jpg',
    ],
    description: 'Departamento acogedor con vista al mar.',
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 70,
      parking: 1,
    },
    location: {
      address: 'Av. Larco 606',
      district: 'Miraflores',
      city: 'Lima',
      coordinates: { lat: -12.1192, lng: -77.0298 },
    },
    status: 'available',
    featured: false,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05',
  },
  {
    id: 22,
    category: 'Departamentos',
    operation: 'Comprar',
    name: 'Departamento de Lujo Miraflores',
    price: 285000,
    currency: 'PEN',
    priceDisplay: 'S/285,000.00',
    image: '/images/properties/departamento-22.jpg',
    images: [
      '/images/properties/departamento-22.jpg',
      '/images/properties/departamento-22-2.jpg',
      '/images/properties/departamento-22-3.jpg',
    ],
    description: 'Departamento de lujo en zona exclusiva.',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      parking: 2,
    },
    location: {
      address: 'Calle Malecón 707',
      district: 'Miraflores',
      city: 'Lima',
      coordinates: { lat: -12.1215, lng: -77.0312 },
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
  },
];

export const agents = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'Director General',
    image: '/images/team/carlos.jpg',
    phone: '+51 947 859 358',
    email: 'carlos@tuagente.com.pe',
    description: 'Más de 15 años de experiencia en el mercado inmobiliario peruano.',
  },
  {
    id: 2,
    name: 'María García',
    role: 'Asesora Inmobiliaria',
    image: '/images/team/maria.jpg',
    phone: '+51 947 859 359',
    email: 'maria@tuagente.com.pe',
    description: 'Especialista en propiedades residenciales en Lima.',
  },
  {
    id: 3,
    name: 'Roberto Sánchez',
    role: 'Asesor Comercial',
    image: '/images/team/roberto.jpg',
    phone: '+51 947 859 360',
    email: 'roberto@tuagente.com.pe',
    description: 'Experto en locales comerciales y oficinas.',
  },
];

export const blogPosts = [
  {
    slug: 'santiago-de-surco',
    title: 'Santiago de Surco: El distrito familiar por excelencia en Lima',
    excerpt: 'Descubre por qué Santiago de Surco es el distrito preferido para familias que buscan calidad de vida en Lima.',
    content: `
      Santiago de Surco se ha consolidado como uno de los distritos más buscados de Lima para familias. Con una excelente infraestructura, parques y centros educativos de primer nivel, este distrito ofrece todo lo que una familia necesita.

      ## ¿Por qué elegir Santiago de Surco?

      ### Calidad de Vida
      Santiago de Surco cuenta con amplias zonas verdes, parques modernos y una excelente conectividad vial. Los residentes disfrutan de un ambiente seguro y familiar.

      ### Educación
      El distrito alberga algunos de los mejores colegios e instituciones educativas de Lima, incluyendo colegios bilingües e internacionales.

      ### Comercio y Servicios
      La avenida La Marina y la avenida Benavides ofrecen una amplia variedad de tiendas, restaurantes y centros comerciales.

      ### Conectividad
      Santiago de Surco tiene acceso directo a las principales vías de la ciudad, facilitando los desplazamientos a otras zonas de Lima.
    `,
    image: '/images/blog/santiago-surco.jpg',
    category: 'Zonas',
    date: '15 Nov 2024',
    author: 'Equipo TUAGENTE.PE',
    readTime: '5 min',
  },
  {
    slug: 'consejos-comprar-vivienda',
    title: '5 Consejos vitales antes de comprar tu primera vivienda en Lima',
    excerpt: 'Guía completa para primeros compradores de vivienda en la capital peruana.',
    content: `
      Comprar tu primera vivienda es una de las decisiones más importantes de tu vida. Aquí te compartimos 5 consejos esenciales para que tomes la mejor decisión.

      ## 1. Define tu presupuesto
      Antes de empezar a buscar, es fundamental saber cuánto puedes invertir. Considera no solo el precio de venta, sino también los gastos adicionales como impuestos, escrituras y posible remodelación.

      ## 2. Elige la ubicación correcta
      La ubicación es clave en una inversión inmobiliaria. Considera factores como:
      - Proximidad a tu lugar de trabajo
      - Acceso a transporte público
      - Servicios cercanos (hospitales, colegios, supermercados)
      - Seguridad de la zona

      ## 3. Revisa la documentación
      Asegúrate de que la propiedad tenga toda la documentación en orden:
      - Título de propiedad
      - Certificado de gravámenes
      - Pagos de impuestos al día
      - Planos aprobados

      ## 4. No te apresures
      Tomate tu tiempo para visitar varias opciones. No compres la primera propiedad que veas sin antes comparar con otras alternativas.

      ## 5. Busca asesoría profesional
      Un buen agente inmobiliario puede guiarte en todo el proceso y ayudarte a evitar errores costosos.
    `,
    image: '/images/blog/consejos-compra.jpg',
    category: 'Consejos',
    date: '10 Nov 2024',
    author: 'Equipo TUAGENTE.PE',
    readTime: '7 min',
  },
];

export const contactInfo = {
  address: 'Cll. Solidaridad Nro 105, Santiago de Surco, Lima',
  phone: '947 859 358',
  email: 'contacto@tuagente.com.pe',
  hours: 'Lunes a Domingo 9am a 6pm',
  social: {
    facebook: 'https://facebook.com/tuagente.pe',
    instagram: 'https://instagram.com/tuagente.pe',
    whatsapp: 'https://wa.me/51947859358',
  },
};