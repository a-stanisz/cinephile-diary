module.exports = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "invalid payload" });
    }
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "invalid payload" });
    }
    req.searchStr = title;
  } catch (error) {
    next();
  }
  next();
};
