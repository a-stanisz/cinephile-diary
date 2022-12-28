const { UnknownError } = require('../shared/errors');

const ajv = require('../../shared/ajv-cache');
const movieQuerySchema = require('./movieQuery.schema.json');

module.exports = function movieQueryValidation(requestBody) {
  let validationSchema;
  validationSchema = ajv.getSchema('query-schema');
  if (!validationSchema) {
    ajv.addSchema(movieQuerySchema, 'query-schema');
    validationSchema = ajv.getSchema('query-schema');
  }
  if (validationSchema === undefined) {
    throw new UnknownError('Unexpected validation failure');
  }
  const isValid = validationSchema(requestBody);
  if (isValid) {
    return true;
  }
};
