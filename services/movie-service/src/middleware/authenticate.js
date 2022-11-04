const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader !== undefined) {
      const providedToken = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(String(providedToken), JWT_SECRET);
      if (decodedToken) {
        req.user = decodedToken;
        console.log("User authentication: passed");
        next();
      }
    }
    throw new Error("Unauthorized!");
  } catch (err) {
    next(err);
  }
};
