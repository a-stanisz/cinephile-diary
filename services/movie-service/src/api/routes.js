const express = require("express");

const authenticateToken = require("./middleware/authenticateToken");
const validateToken = require("./middleware/validateToken");
const updateUser = require("./middleware/updateUser");
const authorizeUser = require("./middleware/authorizeUser");
const getTitleToSearch = require("./middleware/getTitleToSearch");

const router = express.Router();

const User = require("../database/models/user");
const Movie = require("../database/models/movie");

const getMovieData = require("../domain/getMovieData");

router.post(
  "/api/v1/movie",
  authenticateToken,
  validateToken,
  updateUser,
  authorizeUser,
  getTitleToSearch,
  async (req, res, next) => {
    try {
      const movieTitle = req.searchStr;
      let user = req.user;
      const entry = await getMovieData(movieTitle);
      const movieEntry = new Movie(entry);
      await movieEntry.save();
      user.diaryEntries.push(movieEntry);
      if (!user.serviceUsage.counter) {
        user.serviceUsage.counter = 0;
      }
      user.serviceUsage.counter++;
      await user.save();
      res.status(200).json({
        message: `Movie: <<${entry.title}>> has been added to the User's Cinephile Diary!`,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/api/v1/movies",
  authenticateToken,
  validateToken,
  updateUser,
  async (req, res, next) => {
    try {
      const userId = req.user.userId;
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
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
