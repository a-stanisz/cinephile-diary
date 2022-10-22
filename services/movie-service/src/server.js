const express = require('express');
const dbConnect = require('./database/connect');
const resetLimitCounters = require('./workers/resetCounter');

dbConnect();

const PORT = process.env.MOVIE_SERVICE_PORT || 8080;

const diaryRoutes = require('./routes/diary');
const app = express();

app.use(express.json());
app.use('/', diaryRoutes);

app.get('/', (req, res, next) => {
  res.send('You are accessing the root route of the movie-service. Hello!')
});

app.listen(PORT, () => {
  console.log(`movie service is running at port ${PORT}`);
});

resetLimitCounters();