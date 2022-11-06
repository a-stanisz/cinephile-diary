const omdb = require("../external-apis/omdb");

module.exports = async (movieToSearch) => {
  try {
    let success;
    const data = await omdb(movieToSearch);
    data.Response === "True" ? (success = true) : (success = false);
    if (success) {
      const movieObj = {
        title: data.Title,
        releaseDate: data.Released,
        genre: data.Genre,
        director: data.Director,
      };
      return movieObj;
    }
    throw new Error(`OMDB API Error: ${data.Error}`);
  } catch (error) {
    console.error(error);
  }
};
