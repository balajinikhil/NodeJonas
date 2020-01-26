const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Up and running ${port}....`);
});
