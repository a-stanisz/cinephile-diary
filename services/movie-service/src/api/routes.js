const express = require('express');

const jwtVerifier = require('./middleware/jwtVerifier');
const validateToken = require('./middleware/validateToken');
const updateUser = require('./middleware/updateUser');
const authorizeUser = require('./middleware/authorizeUser');
const getTitleToSearch = require('./middleware/getTitleToSearch');

const User = require('../database/models/user');
const Movie = require('../database/models/movie');

const router = express.Router();

const { addUserMovie } = require('../domain/useCases');

router.post('/movie', jwtVerifier, async (req, res, next) => {
  try {
    const userLoginData = req.decodedToken;
    if (!req.body) {
      return res.status(400).json({ error: 'invalid payload' });
    }
    const movieQuery = req.body;
    const addMovieResponse = await addUserMovie(userLoginData, movieQuery);
    return res
      .status(addMovieResponse.statusCode)
      .json({ message: addMovieResponse.body });
  } catch (error) {
    next(error);
    return undefined;
  }
});

router.get(
  '/movies',
  jwtVerifier,
  // validateToken,
  // updateUser,
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
