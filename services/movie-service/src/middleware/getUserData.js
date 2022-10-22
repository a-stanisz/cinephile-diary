module.exports = async (req, res, next) => {
  try {
    if (!req.tokenData) {
      const error = new Error('Not Found!');
      error.statusCode = 404;
      throw error;
    }
    req.user = {
      userId: req.tokenData.userId,
      userName: req.tokenData.name,
      userRole: req.tokenData.role,
    }
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  next();
  }