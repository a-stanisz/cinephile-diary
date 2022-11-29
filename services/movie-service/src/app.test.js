const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("./app");

const { JWT_SECRET, TEST_TOKEN_BASIC_USER, TEST_TOKEN_PREMIUM_USER } = process.env;

console.log(TEST_TOKEN_BASIC_USER, TEST_TOKEN_PREMIUM_USER)

jest.mock('jsonwebtoken');

describe("POST /movies", () => {
  describe("given a valid movie title", () => {
    describe("for basic user", () => {
      // should save the movie to the database
      // should send structured-json response indicating successs
      test("should respond with a 200 status code", async () => {
        try {
          // const token = await getTokens()[0];
          const response = await request(app)
            .post("/movies")
            .set("Authorization", `Bearer ${TEST_TOKEN_BASIC_USER}`)
            .set("Content-Type", "application/json")
            .send({ title: "The Last Duel" });
          expect(response.statusCode).toBe(200);
        } catch (error) {
          console.error(error);
        }
      });
    });
    describe("for premium user", () => {
      // should save the movie to the database
      // should send structured-json response indicating successs
      test("should respond with a 200 status code", async () => {
        try {
          // const token = await getTokens()[0];
          const response = await request(app)
            .post("/movies")
            .set("Authorization", `Bearer ${TEST_TOKEN_PREMIUM_USER}`)
            .set("Content-Type", "application/json")
            .send({ title: "The Last Duel" });
          expect(response.statusCode).toBe(200);
        } catch (error) {
          console.error(error);
        }
      });
    });

    describe("given an invalid movie title", () => {
      // should send structured-json error response indicating failure
    });
  });
  describe("for basic user role", () => {});
});

describe("GET /movies", () => {});
