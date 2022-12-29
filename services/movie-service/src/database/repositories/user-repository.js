const User = require('../models/user');
const { DataAccessError } = require('../../shared/AppErrors');

module.exports = async function createUser(userData) {
  try {
    let user;
    user = new User({
      userId: userData.userId,
      userName: userData.name,
      userRole: userData.role,
    });
    await user.save();
  } catch (error) {
    throw new DataAccessError(`Error on DB-creating a User: ${error}`);
  }
};

module.exports = async function getUser(userData) {
  try {
    const userMovies = await Movie.find({ _id: { $in: user.diaryEntries } });
  } catch (error) {
    throw new DataAccessError(`Error on DB-getting a User: ${error}`);
  }
};

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
    throw new DataAccessError(`Error on DB-updating a User: ${error}`);
  }
};
