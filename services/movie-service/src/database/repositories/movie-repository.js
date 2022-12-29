const Movie = require('../models/movie');

async function addMovie(entryDetails) {
  const newMovieEntry = new Movie(entryDetails);
  await newMovieEntry.save();
  return newMovieEntry;
}

function getMovie(movieDetails) {}

module.exports = { addMovie, getMovie };
