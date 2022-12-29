const { UnknownError } = require('./AppErrors');
const ajv = require('./ajv-cache');

module.exports = function validationSchema(schema, schemaName) {
  let validationSchema;
  validationSchema = ajv.getSchema(schemaName);
  if (!validationSchema) {
    ajv.addSchema(schema, schemaName);
    validationSchema = ajv.getSchema(schemaName);
  }
  if (validationSchema === undefined) {
    throw new UnknownError('Unexpected validation failure');
  }
  return validationSchema;
};
