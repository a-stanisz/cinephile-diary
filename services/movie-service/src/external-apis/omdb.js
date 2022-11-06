const axios = require('axios');
const { OMDB_APIKEY } = process.env;

const getMovieDataByTitle = async (title) => {
  try {
    const omdbURI = `http://www.omdbapi.com/?apikey=${OMDB_APIKEY}&t=${title}`;
    const res = await axios.get(omdbURI);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getMovieDataByTitle;