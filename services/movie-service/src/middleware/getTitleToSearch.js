const { Validator } = require("express-json-validator-middleware");
const validator = new Validator();
const movieSchema = require("../domain/movie.schema.json");
validator.ajv.addSchema(movieSchema, "movieSchema");

module.exports = async (req, res, next) => {
  try {
    const body = req.body;
    if (!req.body) {
      return res.status(400).json({ error: "invalid payload" });
    }
    const title = body.title;
    validator.validate({ title: movieSchema });
    req.searchStr = title;
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};
