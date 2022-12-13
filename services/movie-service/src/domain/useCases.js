const userValidation = require("./userValidation");

module.exports = async function addMovie(userLoginData, newMovieData) {
  try {
    if (!userValidation(userLoginData)) {
      throw new Error("Validation error!");
    }
    

    handleUser(userLoginData);
    const response = await addMovie(newMovieData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = async function getUserMovies(userLoginData) {
  handleUser(userLoginData);
  const response = await getMovies(userLoginData);
  return response;
};
