class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
  }
}

module.exports = async (req, res, next) => {
  try {
    let user = req.user;
    if (
      user.serviceUsage.isLimited &&
      user.serviceUsage.counter >= user.serviceUsage.limit
    ) {
      throw new AuthorizationError(
        `usage limit of ${user.serviceUsage.limit} entries/month has been reached!`
      );
    }
    console.log("User authorization: passed");
    next();
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return res.status(402).json({ error: error.message });
    }
    next(error);
  }
};
