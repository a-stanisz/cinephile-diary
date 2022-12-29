const User = require('./User');
const { AuthorizationError } = require('../shared/AppErrors');

module.exports = function userAuthorization(userData) {
  // let validationSchema;
  // validationSchema = ajv.getSchema("user-schema");
  // if (!validationSchema) {
  //   ajv.addSchema(userSchema, "user-schema");
  //   validationSchema = ajv.getSchema("user-schema");
  // }
  // if (validationSchema === undefined) {
  //   console.log("Unexpected validation failure");
  // }
  const isAuthorized = validationSchema(userData);
  if (isAuthorized) {
    return true;
  }
  throw new AuthorizationError(`Error on Userr's Authorization: ${error}`);
};
