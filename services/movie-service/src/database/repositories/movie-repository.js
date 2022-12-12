const Movie = require("../models/movie");

module.exports = async function addMovie(entryDetails) {
  const newMovieEntry = new Movie(entryDetails);
  await newMovieEntry.save();
};
module.exports = async function getMovie(movieDetails) {};
