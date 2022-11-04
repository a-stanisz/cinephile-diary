module.exports = async (err, req, res, next) => {
  if (err.message === "Unauthorized!") {
    err.statusCode = 401;
    console.error(err.message);
  }
  next(err);
};
