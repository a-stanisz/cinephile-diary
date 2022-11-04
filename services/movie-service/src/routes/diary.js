const express = require("express");
const authenticate = require("../middleware/authenticate");
const authenticationError = require("../middleware/authenticationError");
const updateUser = require("../middleware/updateUser");
const authorizeUser = require("../middleware/authorizeUser");
const getTitleToSearch = require("../middleware/getTitleToSearch");
const diaryController = require("../controllers/diary");

const router = express.Router();

router.post(
  "/movies",
  authenticate,
  authenticationError,
  updateUser,
  authorizeUser,
  getTitleToSearch,
  diaryController.postMovie
);

router.get(
  "/movies",
  authenticate,
  authenticationError,
  updateUser,
  diaryController.getUserMovies
);

module.exports = router;
