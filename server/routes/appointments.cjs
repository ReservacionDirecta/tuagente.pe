const express = require('express');
const router = express.Router();
const db = require('../db.cjs');
const { authenticate, authorize } = require('../middleware/auth.cjs');

router.post('/', (req, res) => {
  const { property_id, name, email, phone, date, time, message } = req.body;

  if (!property_id || !name || !email || !phone || !date || !time) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados.' });
  }

  const property = db.prepare('SELECT id, name FROM properties WHERE id = ?').get(property_id);
  if (!property) {
    return res.status(404).json({ error: 'Propiedad no encontrada.' });
  }

  const result = db.prepare(`
    INSERT INTO appointments (property_id, name, email, phone, date, time, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(property_id, name, email, phone, date, time, message || null);

  res.status(201).json({
    id: result.lastInsertRowid,
    message: 'Cita agendada exitosamente.',
    property_name: property.name,
  });
});

router.get('/', authenticate, authorize('admin'), (req, res) => {
  const { status } = req.query;

  let query = `
    SELECT a.*, p.name as property_name, p.category, p.operation, p.district
    FROM appointments a
    JOIN properties p ON a.property_id = p.id
  `;
  const params = [];

  if (status) {
    query += ' WHERE a.status = ?';
    params.push(status);
  }

  query += ' ORDER BY a.created_at DESC';

  const appointments = db.prepare(query).all(...params);
  res.json(appointments);
});

router.put('/:id', authenticate, authorize('admin'), (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido. Use: pending, confirmed, cancelled.' });
  }

  const existing = db.prepare('SELECT id FROM appointments WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Cita no encontrada.' });
  }

  db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
  res.json({ message: 'Estado actualizado.' });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const { id } = req.params;

  const existing = db.prepare('SELECT id FROM appointments WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Cita no encontrada.' });
  }

  db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
  res.json({ message: 'Cita eliminada.' });
});

module.exports = router;
