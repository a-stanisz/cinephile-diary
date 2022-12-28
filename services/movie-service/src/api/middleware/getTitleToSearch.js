const movieQueryValidation = require('../../domain/movieQueryValidation');

module.exports = async (req, res, next) => {
  try {
    const body = req.body;
    if (!req.body) {
      return res.status(400).json({ error: 'invalid payload' });
    }
    if (!movieQueryValidation(body)) {
      return res.status(400).json({ error: 'invalid payload' });
    }
    req.searchStr = body.title;
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};
