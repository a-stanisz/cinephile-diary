const User = require("../models/user");

const basicUsersServiceUsageLimit = 5;

module.exports = async (req, res, next) => {
  try {
    let user;
    user = await User.findOne({ userId: req.user.userId });
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
    }
    req.user = user;
  } catch (err) {
    next();
  }
  next();
};
