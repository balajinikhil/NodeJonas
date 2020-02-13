//UNCAUGHT ERROR
process.on("uncaughtException", err => {
  console.error(`${err.name} and ${err.message}`);
  process.exit(1);
});

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env"
});
console.log(`NODE_ENV`, process.env.NODE_ENV);

const mongoose = require("mongoose");
const app = require("./app");

let DB = process.env.DATABASE;
DB = DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB connected... ");
  });

const port = process.env.PORT || 5502;

const server = app.listen(port, () => {
  console.log(`server up and running ${port}`);
});

//UNCAUGHT PROMISE
process.on("unhandledRejection", err => {
  console.error(`${err.message} and ${err.name}`);

  server.close(() => {
    process.exit(1);
  });
});
