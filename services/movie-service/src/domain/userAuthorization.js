const User = require('./User');
const { AuthorizationError } = require('../shared/AppErrors');

module.exports = function userAuthorization(userData) {
  // authorize User
  const isAuthorized = validationSchema(userData);
  if (isAuthorized) {
    return true;
  }
  throw new AuthorizationError(`Error on Userr's Authorization: ${error}`);
};
