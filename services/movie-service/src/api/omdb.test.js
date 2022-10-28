const omdb = require('./omdb');
const axios = require('axios');
const { OMDB_APIKEY } = process.env;

jest.mock('axios');

describe('fetchData', () => {
  it('success on fetching data from the OMDB API', async () => {
    const title = 'Hobbit';
    const resData = {
      Title: 'The Hobbit: An Unexpected Journey',
      Released: '14 Dec 2012',
      Genre: 'Adventure, Fantasy',
      Director: 'Peter Jackson',
    }
    try {
      axios.get.mockImplementationOnce(() => Promise.resolve({data: resData}));
      await expect(omdb(title)).resolves.toMatchObject(resData);
      expect(axios.get).toHaveBeenCalledWith(
        `http://www.omdbapi.com/?apikey=${OMDB_APIKEY}&t=${title}`
      );
    } catch (err) {
      console.log(err);
    }
  });

  it('failure on fetching data from the OMDB API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
  });
});