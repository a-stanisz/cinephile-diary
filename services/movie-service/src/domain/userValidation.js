const ajv = require('../shared/ajv-cache');
const userSchema = require('./user.schema.json');
const { UnknownError } = require('../shared/errors');

module.exports = function userValidation(userData) {
  let validationSchema;
  validationSchema = ajv.getSchema('user-schema');
  if (!validationSchema) {
    ajv.addSchema(userSchema, 'user-schema');
    validationSchema = ajv.getSchema('user-schema');
  }
  if (validationSchema === undefined) {
    throw new UnknownError('Unexpected validation failure');
  }
  const isValid = validationSchema(userData);
  if (isValid) {
    return true;
  }
};
