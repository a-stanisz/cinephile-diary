const app = require("./app");
const dbConnect = require("./database/connect");
const resetLimitCounters = require("./workers/resetCounter");

dbConnect();

const PORT = process.env.MOVIE_SERVICE_PORT || 8080;

app.listen(PORT, () => {
  console.log(`movie service is running at port ${PORT}`);
});

resetLimitCounters();
