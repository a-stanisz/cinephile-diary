// const { AuthorizationError } = require('../../shared/AppErrors');

// module.exports = async (req, res, next) => {
//   try {
//     let user = req.user;
//     if (
//       user.serviceUsage.isLimited &&
//       user.serviceUsage.counter >= user.serviceUsage.limit
//     ) {
//       throw new AuthorizationError(
//         `Usage limit of ${user.serviceUsage.limit} entries per month has been reached!`
//       );
//     }
//     next();
//   } catch (error) {
//     if (error instanceof AuthorizationError) {
//       return res.status(402).json({ error: error.message });
//     }
//     next(error);
//   }
// };
