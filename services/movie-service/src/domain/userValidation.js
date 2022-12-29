const userSchema = require('./user.schema.json');
const validationSchema = require('../shared/ajv-addSchema');

module.exports = function userValidation(userLoginData) {
  const validate = validationSchema(userSchema, 'user-schema');
  const isValid = validate(userLoginData);
  if (isValid) {
    return true;
  }
};
