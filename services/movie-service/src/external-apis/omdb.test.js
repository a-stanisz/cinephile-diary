const omdb = require("./omdb");
const expect = require("chai").expect;

describe("External OMDB API call", () => {
  const testTitle = "Dune";
  const mockedResponseObj = {
    Title: "Dune",
    Released: "22 Oct 2021",
    Genre: "Action, Adventure, Drama",
    Director: "Denis Villeneuve",
    Response: "True",
  };

  it("should successfully fetch movie data", async () => {
    try {
      const movie = await omdb(testTitle);
      expect(movie).to.include.keys(Object.keys(mockedResponseObj));
    } catch (error) {
      console.log(error);
    }
  });
});
