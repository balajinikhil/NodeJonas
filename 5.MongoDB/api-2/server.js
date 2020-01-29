const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

// const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log(`DB couldn't connect ${err}`);
  });

const port = 5000;

app.listen(port, () => {
  console.log(`up and running ${port}`);
});
