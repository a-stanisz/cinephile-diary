const app = require("./api/expressApp");
// const resetLimitCounters = require("./workers/resetCounter");

const PORT = process.env.MOVIE_SERVICE_PORT || 8080;

app.listen(PORT, () => {
  console.log(`movie service is running at port ${PORT}`);
});

// resetLimitCounters();
