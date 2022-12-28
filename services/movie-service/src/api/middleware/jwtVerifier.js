const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { AuthenticationError } = require('../../shared/errors');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new AuthenticationError('invalid header');
    }
    const providedToken = authHeader.split(' ')[1];
    req.decodedToken = jwt.verify(String(providedToken), JWT_SECRET);
    if (!req.decodedToken) {
      throw new AuthenticationError('invalid token');
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({ error: error.message });
    }
    console.error(error);
    next(error);
  }
  next();
};
