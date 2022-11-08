const { Validator } = require("express-json-validator-middleware");
const validator = new Validator();
const userSchema = require("../domain/user.schema.json");
validator.ajv.addSchema(userSchema, "userSchema");
const movieSchema = require("../domain/movie.schema.json");
validator.ajv.addSchema(movieSchema, "movieSchema");

module.exports = async (req, res, next) => {
  try {
    const token = req.decodedToken;
    validator.validate({ token: userSchema });
    req.user = token;
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};
