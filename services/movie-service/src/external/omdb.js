const axios = require('axios');
const formatISO = require('date-fns/formatISO');
const { OMDB_APIKEY } = process.env;
const omdbValidation = require('./omdbValidation');

const { DataAccessError, ValidationError } = require('../shared/AppErrors');

const getMovie = async (title) => {
  try {
    const omdbURI = `http://www.omdbapi.com/?apikey=${OMDB_APIKEY}&t=${title}`;
    const res = await axios.get(omdbURI);
    if (!omdbValidation(res.data)) {
      throw new ValidationError('OMDB data validation error!');
    }
    if (res.data.Response === 'False') {
      res.data = { error: res.data.Error };
    }
    if (res.data.Response === 'True') {
      res.data = {
        title: res.data.Title,
        releaseDate: formatISO(new Date(res.data.Released)),
        genre: res.data.Genre,
        director: res.data.Director,
      };
    }
    return res.data;
  } catch (error) {
    throw new DataAccessError(`OMDB error: ${error}`);
  }
};

module.exports = getMovie;
