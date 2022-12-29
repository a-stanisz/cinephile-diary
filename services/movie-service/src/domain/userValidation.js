const userSchema = require('./user.schema.json');
const validationSchema = require('../shared/ajv-addSchema');

module.exports = function userValidation(requestBody) {
  const validate = validationSchema(userSchema, 'user-schema');
  const isValid = validate(requestBody);
  if (isValid) {
    return true;
  }
};
