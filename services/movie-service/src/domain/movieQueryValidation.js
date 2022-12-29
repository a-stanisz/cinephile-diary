const movieQuerySchema = require('./movieQuery.schema.json');
const validationSchema = require('../shared/ajv-addSchema');

module.exports = function movieQueryValidation(requestBody) {
  const validate = validationSchema(movieQuerySchema, 'movie-query-schema');
  const isValid = validate(requestBody);
  if (isValid) {
    return true;
  }
};
