const express = require("express");

const authenticateToken = require("../middleware/authenticateToken");
const validateToken = require("../middleware/validateToken");
const updateUser = require("../middleware/updateUser");
const authorizeUser = require("../middleware/authorizeUser");
const getTitleToSearch = require("../middleware/getTitleToSearch");
const diaryController = require("../controllers/diary");

const router = express.Router();

router.post(
  "/movies",
  authenticateToken,
  validateToken,
  updateUser,
  authorizeUser,
  getTitleToSearch,
  diaryController.postMovie
);

router.get(
  "/movies",
  authenticateToken,
  validateToken,
  updateUser,
  diaryController.getUserMovies
);

module.exports = router;
