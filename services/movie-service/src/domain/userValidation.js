const ajv = require("./ajv-cache");

const userSchema = require("./user.schema.json");

module.exports = function userValidation(userData) {
  let validationSchema;
  validationSchema = ajv.getSchema("user-schema");
  if (!validationSchema) {
    ajv.addSchema(userSchema, "user-schema");
    validationSchema = ajv.getSchema("user-schema");
  }
  if (validationSchema === undefined) {
    console.log("Unexpected validation failure");
  }
  const isValid = validationSchema(userData);
  if (isValid) {
    return true;
  }
  console.log("Validation error");
};
