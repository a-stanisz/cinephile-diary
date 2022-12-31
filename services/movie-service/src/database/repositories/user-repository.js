const User = require('../models/user');
const { DataAccessError } = require('../../shared/AppErrors');
const { get } = require('mongoose');

async function createUser(userData) {
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
}

async function getUser(userData) {
  try {
    let user;
    user = await User.findOne({ userId: userData.userId });
    return user;
  } catch (error) {
    throw new DataAccessError(`Error on DB-getting a User: ${error}`);
  }
}

async function saveUserMovie(userData, movie) {
  try {
    let user;
    user = await getUser(userData);
    user.diaryEntries.push(movie);
    await user.save();
    // let user;
    // user = await User.findOne({ userId: user.userId });
    // user.populate('diaryEntries.movie');
  } catch (error) {
    throw new DataAccessError(`Error on DB-saving a User's movie: ${error}`);
  }
}

async function getUserMovies(userData) {
  try {
    const userMovies = await Movie.find({ _id: { $in: user.diaryEntries } });
    return userMovies;
  } catch (error) {
    throw new DataAccessError(`Error on DB-getting a User's movies: ${error}`);
  }
}

async function updateUser(userData) {
  try {
    if (!(await getUser(userData))) {
      await createUser(userData);
    }
    let user;
    user = await getUser(userData);
    await user.save();
  } catch (error) {
    throw new DataAccessError(`Error on DB-updating a User: ${error}`);
  }
}

module.exports = {
  createUser,
  getUser,
  saveUserMovie,
  getUserMovies,
  updateUser,
};
