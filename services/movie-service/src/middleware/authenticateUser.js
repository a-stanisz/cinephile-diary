const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Unauthorized!');
      error.statusCode = 401;
      throw error;
    }
    const providedToken = authHeader.split(' ')[1];
    decodedToken = jwt.verify(String(providedToken), JWT_SECRET);
    if (!decodedToken) {
      const error = new Error('Unauthorized!');
      error.statusCode = 401;
      throw error.message;
    }
    req.tokenData = decodedToken;
    console.log('User authentication: passed')
  } catch (err) {
    err.statusCode = 500;
    throw err;
  };
  next();
}