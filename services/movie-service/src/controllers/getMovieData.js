const omdb = require('../external-apis/omdb');

module.exports = async (movieToSearch) => {
  try {
    const movieData = await omdb(movieToSearch);
    if (!movieData.Title) {
      const error = new Error('Not Found!');
      error.statusCode = 404;
      throw error.message;
    }
    const movieObj = {
      title: movieData.Title,
      releaseDate: movieData.Released,
      genre: movieData.Genre,
      director: movieData.Director,
    };
    return movieObj;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  };
}