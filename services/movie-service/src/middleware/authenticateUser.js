const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new AuthenticationError("Invalid auth header!");
    }
    const providedToken = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(String(providedToken), JWT_SECRET);
    if (!decodedToken) {
      throw new AuthenticationError("Invalid credentials!");
    }
    req.user = decodedToken;
    console.log("User authentication: passed");
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({ error: error.message });
    }
    console.error(error);
    next(error);
  }
  next();
};
