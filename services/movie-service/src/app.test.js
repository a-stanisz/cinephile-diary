const request = require("supertest");
const axios = require("axios");

const app = require("./app");

jest.mock("axios");

const testUsersCreds = [
  {
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8",
  },
  {
    username: "premium-jim",
    password: "GBLtTyq3E_UNjFnpo9m6",
  },
];

const getUserToken = async (creds) => {
  try {
    const authURL = `http://auth-service:3001/auth`;
    let success;
    const res = await axios.post(authURL, {
      username: creds.username,
      password: creds.password,
    });
    res.data.Response === "True" ? (success = true) : (success = false);
    if (success) {
      return Promise.resolve(res.data.token);
    }
    throw new Error(`auth-service error: ${data.Error}`);
  } catch (error) {
    console.error(error);
  }
};

async function getTokens() {
  try {
    const tokens = testUsersCreds.map(async (creds) => {
      await getUserToken(creds);
    });
    return tokens;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  console.log(await getTokens());
})();

describe("POST /movies", () => {
  describe("for any user role", () => {
    describe("given a valid movie title", () => {
      // should save the movie to the database
      // should send structured-json response indicating successs
      test("should respond with a 200 status code", async () => {
        try {
          const response = await request(app)
            .post("/movies")
            .set("Authorization", `Bearer ${await getTokens()}`)
            .set("Content-Type", "application/json")
            .send({ title: "The Last Duel" });
          await expect(response.statusCode).resolves.toBe(200);
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
