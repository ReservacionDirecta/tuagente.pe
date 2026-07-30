require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize database
require('./db.cjs');

const authRoutes = require('./routes/auth.cjs');
const propertyRoutes = require('./routes/properties.cjs');
const appointmentRoutes = require('./routes/appointments.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/images/properties');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded images from public/
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Serve built React app from dist/
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/appointments', appointmentRoutes);

// SPA fallback: serve index.html for all non-API, non-file routes
app.get(/^\/(?!api).*/, (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build no encontrado. Ejecuta: npm run build');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  if (err.message && err.message.includes('Solo se permiten imágenes')) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Error interno del servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('API disponible en http://localhost:' + PORT + '/api');
});
