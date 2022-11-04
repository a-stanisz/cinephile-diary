const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    let user = req.user;
    if (
      user.serviceUsage.isLimited &&
      user.serviceUsage.counter >= user.serviceUsage.limit
    ) {
      console.log('User authorization: failed. Usage limit reached!')
      res.status(402).json({
        mesage: `The User has reached the limit of ${user.serviceUsage.limit} movie-entries per calendar month!`,
      });
    }
    console.log('User authorization: passed')
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  next();
};
