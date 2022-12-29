// const userValidation = require('../../domain/userValidation');
// const { ValidationError } = require('../../shared/AppErrors');

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.decodedToken;
//     if (!userValidation(token)) {
//       throw new ValidationError('user login data validation failed!');
//     }
//     req.user = token;
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
//   next();
// };
