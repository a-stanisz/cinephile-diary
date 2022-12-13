const User = require("../models/user");

module.exports = async function updateUser(userData) {
  try {
    let user;
    user = await User.findOne({ userId: userData.userId });
    if (!user) {
      user = new User({
        userId: userData.userId,
        userName: userData.name,
        userRole: userData.role,
        serviceUsage: { ...userData.serviceUsage },
      });
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = async function getuser(userDetails) {};
