const userValidation = require('./userValidation');
const movieQueryValidation = require('./movieQueryValidation');
const { ValidationError } = require('../shared/AppErrors');
const {
  updateUser,
  getUser,
} = require('../database/repositories/user-repository');
const omdb = require('../external/omdb');
const { addMovie } = require('../database/repositories/movie-repository');

async function addUserMovie(userLoginData, movieQuery) {
  try {
    let response = {};
    if (!userValidation(userLoginData)) {
      throw new ValidationError('user login data validation failed!');
    }
    if (!movieQueryValidation(movieQuery)) {
      response.statusCode = 400;
      response.body = 'invalid request body!';
      return response;
    }
    const title = movieQuery.title;
    await updateUser(userLoginData);
    const entry = await omdb(title);
    const user = await getUser(userLoginData);
    // console.log(entry);
    const userMovie = await addMovie(entry);
    user.diaryEntries.push(userMovie);
    await updateUser(user);
    response.statusCode = 200;
    response.body = 'success';
    return response;
  } catch (error) {
    if (error instanceof ValidationError) {
      response.statusCode = 401;
      response.body = error.message;
      return response;
    }
    console.error(error);
  }
}

async function getUserMovies(userLoginData) {
  handleUser(userLoginData);
  const response = await getMovies(userLoginData);
  return response;
}

module.exports = { addUserMovie, getUserMovies };
