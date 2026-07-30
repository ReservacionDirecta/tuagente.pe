const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tuagente-secret-key-2024';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tienes permiso para realizar esta acción.' });
    }
    next();
  };
};

module.exports = { authenticate, authorize, JWT_SECRET };
