const User = require("../models/user");
const Movie = require("../models/movie");

const getMovieData = require("./getMovieData");

exports.postMovie = async (req, res, next) => {
  if (!req.user || !req.searchStr) {
    const error = new Error("Not Found!");
    error.statusCode = 404;
    throw error;
  }
  const movieTitle = req.searchStr;
  let user = req.user;
  try {
    const entry = await getMovieData(movieTitle);
    const movieEntry = new Movie(entry);
    await movieEntry.save();
    user.diaryEntries.push(movieEntry);
    user.serviceUsage.counter++;
    await user.save();
    res.status(200).json({
      message: `Movie: <<${entry.title}>> has been added to the User's Cinephile Diary!`,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserMovies = async (req, res, next) => {
  if (!req.user) {
    const error = new Error("Not Found!");
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
    const userMovies = await Movie.find({ _id: { $in: user.diaryEntries } });
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
};
