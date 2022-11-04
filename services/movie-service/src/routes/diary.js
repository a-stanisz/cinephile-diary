const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const verifyUser = require('../middleware/verifyUser');
const authorizeUser = require('../middleware/authorizeUser');
const getTitleToSearch = require('../middleware/getTitleToSearch');
const diaryController = require('../controllers/diary');

const router = express.Router();

router.post(
  '/movies',
  authenticateUser,
  verifyUser,
  authorizeUser,
  getTitleToSearch,
  diaryController.postMovie
);

router.get(
  '/movies',
  authenticateUser,
  verifyUser,
  diaryController.getUserMovies
);

module.exports = router;