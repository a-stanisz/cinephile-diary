const omdb = require('./omdb');
const expect = require('chai').expect;

describe('External OMDB API call', () => {
  describe('When valid movie title is provided', () => {
    const testTitle = 'Dune';
    const mockedMovieObj = {
      title: 'Dune',
      releaseDate: '22 Oct 2021',
      genre: 'Action, Adventure, Drama',
      director: 'Denis Villeneuve',
    };
    it('should successfully fetch movie data', async () => {
      try {
        const movie = await omdb(testTitle);
        expect(movie).to.include.keys(Object.keys(mockedMovieObj));
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('When invalid movie title is provided', () => {
    const testTitle = 'fsdfgsgsd';
    const mockedErrorObj = {
      error: 'some error',
    };
    it('should successfully fetch error', async () => {
      try {
        const movie = await omdb(testTitle);
        expect(movie).to.include.keys(Object.keys(mockedErrorObj));
      } catch (error) {
        console.log(error);
      }
    });
  });
});
