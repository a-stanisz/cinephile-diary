const app = require("./app");

const PORT = process.env.AUTH_SERVICE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
