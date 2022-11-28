const request = require("supertest");
const jwt = require("jsonwebtoken");
// const axios = require("axios");

const app = require("./app");
// const auth = require("../../auth-service/src/app");

const { JWT_SECRET, TEST_TOKEN } = process.env;

jest.mock('jsonwebtoken');

// const testUsersCreds = [
//   {
//     username: "basic-thomas",
//     password: "sR-_pcoow-27-6PAwCD8",
//   },
//   {
//     username: "premium-jim",
//     password: "GBLtTyq3E_UNjFnpo9m6",
//   },
// ];

// const getUserToken = async (creds) => {
//   try {
//     const authURL = `http://auth-service:3001/auth`;
//     let success;
//     const res = await axios.post(authURL, {
//       username: creds.username,
//       password: creds.password,
//     });
//     res.data.Response === "True" ? (success = true) : (success = false);
//     if (success) {
//       return res.data.token;
//     }
//     // throw new Error(`auth-service error: ${res.data.Error}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

// async function getTokens() {
//   try {
//     const tokens = await Promise.all(
//       testUsersCreds.map(async (creds) => {
//         return await Promise.resolve(getUserToken(creds));
//       })
//     );
//     // console.log(tokens);
//     return tokens;
//   } catch (error) {
//     console.error(error);
//   }
// }

// (async () => {
//   let result = await getTokens();
//   console.log(result);
// })();

// const token = await getTokens()[0];
// console.log(token);

// let token = "";

// beforeAll(async () => {
//   const response = await supertest(auth).post("/auth", {
//     username: "premium-jim",
//     password: "GBLtTyq3E_UNjFnpo9m6",
//   });
//   token = response.body.token;
// });

describe("POST /movies", () => {
  describe("for any user role", () => {
    describe("given a valid movie title", () => {
      // should save the movie to the database
      // should send structured-json response indicating successs
      test("should respond with a 200 status code", async () => {
        try {
          // const token = await getTokens()[0];
          const response = await request(app)
            .post("/movies")
            .set("Authorization", `Bearer ${TEST_TOKEN}`)
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
