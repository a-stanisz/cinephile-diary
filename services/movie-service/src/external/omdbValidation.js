const { UnknownError } = require('../shared/errors');

const ajv = require('../shared/ajv-cache');
const omdbSchema = require('./omdb.schema.json');

module.exports = function omdbValidation(omdbData) {
  let validationSchema;
  validationSchema = ajv.getSchema('omdb-schema');
  if (!validationSchema) {
    ajv.addSchema(omdbSchema, 'omdb-schema');
    validationSchema = ajv.getSchema('omdb-schema');
  }
  if (validationSchema === undefined) {
    throw new UnknownError('Unexpected validation failure');
  }
  const isValid = validationSchema(omdbData);
  if (isValid) {
    return true;
  }
};
