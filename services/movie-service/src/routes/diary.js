const express = require("express");

const authenticateUser = require("../middleware/authenticateUser");
const updateUser = require("../middleware/updateUser");
const authorizeUser = require("../middleware/authorizeUser");
const getTitleToSearch = require("../middleware/getTitleToSearch");
const diaryController = require("../controllers/diary");

const router = express.Router();

router.post(
  "/movies",
  authenticateUser,
  updateUser,
  authorizeUser,
  getTitleToSearch,
  diaryController.postMovie
);

router.get(
  "/movies",
  authenticateUser,
  updateUser,
  diaryController.getUserMovies
);

module.exports = router;
