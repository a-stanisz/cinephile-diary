const omdb = require('../services/omdb');

module.exports = async (req, res, next) => {
  try {
    const movieToSearch = req.searchStr;
    const movieData = await omdb(movieToSearch);
    if (!movieData.Title) {
      const error = new Error('Not Found!');
      error.statusCode = 404;
      throw error.message;
    }
    req.movieData = {
      title: movieData.Title,
      releaseDate: movieData.Released,
      genre: movieData.Genre,
      director: movieData.Director,
    };
  } catch (err) {
    err.statusCode = 500;
    throw err;
  };
  next();
}