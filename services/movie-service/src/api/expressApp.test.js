const expect = require("chai").expect;
const app = require("./expressApp");
const request = require("supertest");

const { TEST_TOKEN_BASIC_USER, TEST_TOKEN_PREMIUM_USER } = process.env;

const testTitle = "Drive My Car";

// Problem: how to interact with DB logic?
// TODO: Cover cases when a movie entry already exists!
// TODO: Cover the case of the basic user being within or exceeding the usage limit!

try {
  describe("Test: movie-service API", () => {
    describe("when a valid request body is provided", () => {
      describe("for a basic user", () => {
        // it("should save a movie entry to the database", async () => {
        //   expect();
        // });
        it("should respond with a 200 status code", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_BASIC_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ title: testTitle });
          expect(response.status).to.equal(200);
        });
        it("should have 'application/json' content-type header", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_BASIC_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ title: testTitle });
          expect(response.headers["content-type"]).to.contain("json");
        });
        it("should have structured json response body indicating successs", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_BASIC_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ title: testTitle });
          expect(response.body).to.have.key("message");
        });
      });
      describe("for a premium user", () => {
        // it("should save a movie entry to the database", async () => {
        //   expect();
        // });
        it("should respond with a 200 status code", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_PREMIUM_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ title: testTitle });
          expect(response.status).to.equal(200);
        });
        it("should have 'application/json' content-type header", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_PREMIUM_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ title: testTitle });
          expect(response.headers["content-type"]).to.contain("json");
        });
        it("should have structured json response body indicating successs", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_PREMIUM_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ title: testTitle });
          expect(response.body).to.have.key("message");
        });
      });
    });
    describe("when an ivalid request body is provided", () => {
      describe("for a basic user", () => {
        it("should respond with a 400 status code", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_BASIC_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ bad: "requestBody" });
          expect(response.status).to.equal(400);
        });
        it("should have 'application/json' content-type header", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_BASIC_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ bad: "requestBody" });
          expect(response.headers["content-type"]).to.contain("json");
        });
        it("should have structured json response body indicating failure", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_BASIC_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ bad: "requestBody" });
          expect(response.body).to.have.key("errorMessage");
        });
      });
      describe("for a premium user", () => {
        it("should respond with a 400 status code", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_PREMIUM_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ bad: "requestBody" });
          expect(response.status).to.equal(400);
        });
        it("should have 'application/json' content-type header", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_PREMIUM_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ bad: "requestBody" });
          expect(response.headers["content-type"]).to.contain("json");
        });
        it("should have structured json response body indicating failure", async () => {
          const response = await request(app)
            .post("/movies")
            .auth(TEST_TOKEN_PREMIUM_USER, { type: "bearer" })
            .set("Content-Type", "application/json")
            .send({ bad: "requestBody" });
          expect(response.body).to.have.key("errorMessage");
        });
      });
    });
  });
} catch (error) {}
