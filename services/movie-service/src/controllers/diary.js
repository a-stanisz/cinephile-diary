const User = require('../models/user');
const Movie = require('../models/movie');

const basicUsersServiceUsageLimit = 5;

exports.postMovie = async (req, res, next) => {
  if (!req.user || !req.movieData) {
    const error = new Error('Not Found!');
    error.statusCode = 404;
    throw error;
  }
  const userId = req.user.userId;
  const userName = req.user.userName;
  const userRole = req.user.userRole;
  try {
    let user;
    user = await User.findOne({ userId: userId });
    if (!user) {
      user = new User({
        userId: userId,
        userName: userName,
        userRole: userRole,
      });
      let limitation;
      user.userRole === 'basic' ? limitation = true : limitation = false;
      user.serviceUsage.isLimited = limitation;
      if (user.serviceUsage.isLimited === true) {
        user.serviceUsage.limit = basicUsersServiceUsageLimit;
        user.serviceUsage.counter = 0;
      }
      await user.save();
      console.log('New User created!');
    }
    if (
      user.serviceUsage.isLimited &&
      user.serviceUsage.counter >= user.serviceUsage.limit
    ) {
      res.status(402).json({
        mesage: `The User has reached the limit of ${user.serviceUsage.limit} movie-entries per calendar month!`
      });
    } else {
      const entry = {
        title: req.movieData.title,
        releaseDate: req.movieData.releaseDate,
        genre: req.movieData.genre,
        director: req.movieData.director,
      }
      const movieEntry = new Movie(entry);
      await movieEntry.save();
      user.diaryEntries.push(movieEntry);
      user.serviceUsage.counter++;
      await user.save();
      res.status(200).json({
        message: `Movie: <<${entry.title}>> has been added to the User's Cinephile Diary!`,
      });
    }
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getUserMovies = async (req, res, next) => {
  if (!req.user) {
    const error = new Error('Not Found!');
    error.statusCode = 404;
    throw error;
  }
  const userId = req.user.userId;
  try {
    let user;
    user = await User.findOne({ userId: userId });
    if (!user) {
      res.status(404).json({
        message: `User doesn't have any movies yet!`,
      });
    }
    const userMovies = await Movie.find({ '_id': { $in: user.diaryEntries } });
    res.status(200).json({
      message: `Cinephile Diary entries of the User retrieved!`,
      userMovies: userMovies,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
