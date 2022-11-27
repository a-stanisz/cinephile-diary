const express = require("express");
const { ValidationError } = require("express-json-validator-middleware");
const diaryRoutes = require("./routes/diary");
const app = express();

app.use(express.json());

app.use((error, _, res, __) => {
  try {
    if (res.headersSent) {
      return next(error);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ errors: error.validationErrors });
    }
  }
  next(error);
});

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);
  return res.status(500).json({ error: "internal server error" });
});

app.use("/", diaryRoutes);

app.get("/", (req, res, next) => {
  res.send("You are accessing the root route of the movie-service. Hello!");
});

module.exports = app;
