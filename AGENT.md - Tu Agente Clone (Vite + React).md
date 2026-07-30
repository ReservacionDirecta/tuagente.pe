<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# AGENT.md - Tu Agente Clone (Vite + React)

## 📋 Project Overview

**Objective**: Recreate [tuagente.pe](https://tuagente.pe/) - a Peruvian real estate agency website with modern design and full responsiveness.

**Tech Stack**: Vite + React + Tailwind CSS + React Router + Framer Motion

***

## 🎨 Design Specifications

### Brand Identity

- **Name**: TUAGENTE.PE
- **Tagline**: "Soluciones Inmobiliarias"
- **Primary Color**: Deep Blue (\#1e3a5f or similar)
- **Secondary Color**: Gold/Yellow accents
- **Background**: White (\#ffffff) and Light Gray (\#f8f9fa)
- **Text**: Dark Gray (\#333333)


### Typography

- **Primary Font**: Sans-serif (Inter, Poppins, or similar)
- **Headings**: Bold, 2xl-4xl sizes
- **Body**: Regular, base-lg sizes


### Layout Structure

```
┌─────────────────────────────────────┐
│           HEADER (Sticky)           │
├─────────────────────────────────────┤
│                                     │
│          HERO SECTION               │
│       (Full viewport height)        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     PROPIEDADES DESTACADAS          │
│         (Grid 2x3 or 3x4)           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│           CTA SECTION               │
│      (Background image + text)      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         NUESTROS SERVICIOS          │
│        (Stats counter cards)        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     INFORMACION INMOBILIARIA        │
│          (Blog cards)               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│              FOOTER                 │
│     (4 columns + newsletter)        │
│                                     │
└─────────────────────────────────────┘
```


***

## 🗺️ Site Architecture

### Navigation Menu

| Label | Path | Type |
| :-- | :-- | :-- |
| Inicio | `/` | Home |
| Propiedades | `/propiedades` | Category (with dropdown) |
| → Casas | `/propiedades/casas` | Subcategory |
| → Departamentos | `/propiedades/departamentos` | Subcategory |
| → Oficinas | `/propiedades/oficinas` | Subcategory |
| → Locales | `/propiedades/locales` | Subcategory |
| → Lotes | `/propiedades/lotes` | Subcategory |
| Agentes | `/agentes` | Team |
| Contacto | `/contacto` | Contact |

### Page Routes

```javascript
// src/App.jsx routes
[
  { path: '/', element: <Home /> },
  { path: '/propiedades', element: <Properties /> },
  { path: '/propiedades/:category', element: <PropertyCategory /> },
  { path: '/propiedad/:id', element: <PropertyDetail /> },
  { path: '/agentes', element: <Agents /> },
  { path: '/contacto', element: <Contact /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:slug', element: <BlogPost /> },
]
```


***

## 📄 Content Inventory

### Hero Section

```
H1: "Encuentra con nosotros el inmueble que buscas"
P: "Descubre nuestra selección de propiedades exclusivas en las mejores ubicaciones de Lima"
CTA: "Ver propiedades" / "Agenda una visita"
```


### CTA Section

```
H2: "¿Estas listo para iniciar la compra de tu inmueble?"
P: "Agenda una visita con nosotros y elige la mejor opción"
Button: "Agenda tu visita"
```


### Services Section

```
H2: "Nuestros Servicios"
P: "Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias"

Stats Cards:
- 🏠 PROPIEDADES → 0 (animated counter)
- 😊 CLIENTES FELICES → 0
- 📅 AÑOS EXPERIENCIA → 0
- 👨‍💼 AGENTES EXPERTOS → 0
```


### Blog Section

```
H2: "Informacion Inmobiliaria"
P: "Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias"

Articles:
1. "Santiago de Surco: El distrito familiar por excelencia en Lima"
2. "5 Consejos vitales antes de comprar tu primera vivienda en Lima"
```


### Contact Information[^1][^2]

```
📍 Address: Cll. Solidaridad Nro 105, Santiago de Surco, Lima
📞 Phone: 947 859 358
✉️ Email: contacto@tuagente.com.pe
🕐 Hours: Lunes a Domingo 9am a 6pm
```


### Social Media[^3][^4]

```
Facebook: tuagente.pe | Lima
Instagram: @tuagente.pe
WhatsApp: +51 947 859 358 (floating button)
```


***

## 🏠 Property Data Structure

### Demo Properties List

| ID | Category | Operation | Name | Price |
| :-- | :-- | :-- | :-- | :-- |
| 31 | Lotes y Terrenos | Alquilar | Demo \#31 | S/500.00 |
| 40 | Lotes y Terrenos | Comprar | Demo \#40 | S/100,000.00 |
| 41 | Oficinas | Alquilar | Demo \#41 | S/500.00 |
| 19 | Oficinas | Comprar | Demo \#19 | S/100,000.00 |
| 18 | Locales Comerciales | Alquilar | Demo \#18 | S/500.00 |
| 27 | Locales Comerciales | Comprar | Demo \#27 | S/100,000.00 |
| 95 | Casas | Alquilar | Demo \#95 | S/500.00 |
| 88 | Casas | Comprar | Demo \#88 | S/100,000.00 |
| 34 | Departamentos | Alquilar | Demo \#34 | S/500.00 |
| 22 | Departamentos | Comprar | Demo \#22 | S/100,000.00 |

### Property Object Schema

```javascript
const propertySchema = {
  id: "number",
  category: "string", // "Casas" | "Departamentos" | "Oficinas" | "Locales" | "Lotes"
  operation: "string", // "Alquilar" | "Comprar"
  name: "string",
  price: "number",
  currency: "PEN",
  priceDisplay: "string", // "S/500.00" | "S/100,000.00"
  image: "string", // URL
  images: "array", // [string]
  description: "string",
  features: {
    bedrooms: "number",
    bathrooms: "number",
    area: "number", // m²
    parking: "number",
  },
  location: {
    address: "string",
    district: "string",
    city: "string",
    coordinates: { lat: "number", lng: "number" },
  },
  status: "string", // "available" | "sold" | "rented"
  featured: "boolean",
  createdAt: "date",
  updatedAt: "date",
};
```


***

## 🛠️ Component Specifications

### 1. Header Component

**Features**:

- Sticky on scroll (background changes from transparent to white)
- Responsive hamburger menu for mobile
- Dropdown navigation for "Propiedades"
- CTA button "Agenda tu visita"
- Logo: "TUAGENTE.PE" (text with styled ".PE")

**Behavior**:

- Transparent on top → White with shadow on scroll
- Mobile menu: Full-width slide-down
- Hover effects on nav items
- Active state for current page


### 2. Hero Section

**Features**:

- Full viewport height (min-h-screen)
- Background image with dark overlay
- Centered text (left-aligned on desktop)
- Animated entrance (Framer Motion)
- Primary CTA button
- Optional: Property search bar

**Animation**:

- Text fade-in + slide-up
- Button pulse effect


### 3. Property Card

**Features**:

- Image with hover zoom effect
- Category badge (top-left)
- Title (operation + category + ID)
- Price (large, bold, primary color)
- "Quick View" button on hover
- "Ver más" link with arrow icon

**States**:

- Default: Card with shadow
- Hover: Elevated shadow, image scale, overlay with quick actions
- Loading: Skeleton placeholder


### 4. Properties Grid

**Features**:

- Responsive grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Gap: 2rem
- Filter buttons (optional): All / Casas / Departamentos / etc.
- "View All" button at bottom


### 5. Services Section

**Features**:

- 4 stat cards in a row
- Counter animation (0 → target number)
- Icon + Number + Label per card
- Background: Light gray or gradient

**Animation**:

- Count-up on scroll into view
- Icons: Subtle bounce or pulse


### 6. Blog Card

**Features**:

- Featured image
- Category tag
- Title (2 lines max)
- Excerpt (optional)
- "Read more" link
- Date / Author (optional)


### 7. Footer

**Columns**:

1. **Logo + About**: Brief description of agency
2. **Quick Links**: Navigation links
3. **Contact Info**: Address, phone, email, hours
4. **Newsletter**: Email input + subscribe button

**Bottom Bar**:

- Copyright text
- Social media icons (Facebook, Instagram, WhatsApp)

***

## 📁 File Structure

```
tuagente-clone/
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       ├── hero-lima.jpg
│       ├── properties/
│       └── team/
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Container.jsx
│   │   │   └── Section.jsx
│   │   │
│   │   ├── property/
│   │   │   ├── PropertyCard.jsx
│   │   │   ├── PropertyGrid.jsx
│   │   │   ├── PropertyFilter.jsx
│   │   │   ├── PropertyModal.jsx
│   │   │   └── PropertyDetails.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── PropertiesSection.jsx
│   │   │   ├── CTASection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── BlogSection.jsx
│   │   │   └── StatsCounter.jsx
│   │   │
│   │   ├── contact/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactInfo.jsx
│   │   │   └── MapEmbed.jsx
│   │   │
│   │   └── common/
│   │       ├── SEO.jsx
│   │       └── ScrollToTop.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Properties.jsx
│   │   ├── PropertyCategory.jsx
│   │   ├── PropertyDetail.jsx
│   │   ├── Agents.jsx
│   │   ├── Contact.jsx
│   │   ├── Blog.jsx
│   │   └── BlogPost.jsx
│   │
│   ├── hooks/
│   │   ├── useProperties.js
│   │   ├── useContactForm.js
│   │   ├── useScrollAnimation.js
│   │   └── useCounter.js
│   │
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── components/
│   │       ├── header.css
│   │       ├── footer.css
│   │       └── property-card.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```


***

## ⚙️ Configuration Files

### package.json

```json
{
  "name": "tuagente-clone",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "react-icons": "^4.12.0",
    "axios": "^1.6.0",
    "swiper": "^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^5.0.0"
  }
}
```


### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```


### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2c5282',
          dark: '#1a365d',
        },
        secondary: {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```


### src/styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply font-sans text-gray-900 antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-6 py-3 rounded-full font-medium 
           hover:bg-primary-dark transition-colors duration-300
           inline-flex items-center justify-center;
  }
  
  .btn-secondary {
    @apply bg-secondary text-gray-900 px-6 py-3 rounded-full font-medium 
           hover:bg-secondary-dark transition-colors duration-300
           inline-flex items-center justify-center;
  }
  
  .section-padding {
    @apply py-16 lg:py-24;
  }


<div align="center">⁂</div>

[^1]: https://tuagente.pe/contacto/
[^2]: https://www.findglocal.com/PE/Lima/102877751505956/tuagente.pe
[^3]: https://www.instagram.com/tuagente.pe/
[^4]: https://www.facebook.com/people/tuagentepe/100063804535044/```

