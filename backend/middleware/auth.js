const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token in middleware:', token); // Debug
  if (!token) {
    console.log('No token provided'); // Debug
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Debug
    res.status(401).json({ message: 'Token is not valid' });
  }
};