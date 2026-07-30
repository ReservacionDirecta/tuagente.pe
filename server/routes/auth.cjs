const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db.cjs');
const { JWT_SECRET, authenticate } = require('../middleware/auth.cjs');

const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
  });
});

// Get current user
router.get('/me', authenticate, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role, avatar, phone FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

// Register (admin only)
router.post('/register', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Solo administradores pueden crear usuarios.' });
  }

  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos.' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ error: 'El email ya está registrado.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)').run(name, email, hashedPassword, role || 'agent', phone);

  res.json({ id: result.lastInsertRowid, name, email, role: role || 'agent' });
});

// List users (admin only)
router.get('/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No autorizado.' });
  }
  const users = db.prepare('SELECT id, name, email, role, phone, created_at FROM users').all();
  res.json(users);
});

// Delete user (admin only)
router.delete('/users/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No autorizado.' });
  }
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ message: 'Usuario eliminado.' });
});

module.exports = router;
