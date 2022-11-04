const User = require("../models/user");

const basicUsersServiceUsageLimit = 5;

module.exports = async (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    let user;
    user = await User.findOne({ userId: userId });
    if (!user) {
      user = new User({
        userId: req.user.userId,
        userName: req.user.name,
        userRole: req.user.role,
      });
      let limitation;
      user.userRole === "basic" ? (limitation = true) : (limitation = false);
      user.serviceUsage.isLimited = limitation;
      if (user.serviceUsage.isLimited === true) {
        user.serviceUsage.limit = basicUsersServiceUsageLimit;
        user.serviceUsage.counter = 0;
      }
      await user.save();
      console.log("User verification: user not found. New user created!");
    }
    req.user = user;
    console.log("User verification: passed");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  next();
};
