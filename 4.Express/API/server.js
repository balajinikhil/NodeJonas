const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Up and running ${port}....`);
});
