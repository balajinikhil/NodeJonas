const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("db connected");
  });

const port = 3000;

app.listen(port, () => {
  console.log(`up and running ${port}`);
});
