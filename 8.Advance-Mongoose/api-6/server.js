process.on("uncaughtException", err => {
  console.log(err.name, err.message);
  process.exit(1);
});

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env"
});

console.log(`NODE_ENV :`, process.env.NODE_ENV);

const mongoose = require("mongoose");

let DB = process.env.DATABASE;
DB = DB.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`DB connected `);
  });

const app = require("./app");

const port = process.env.PORT || 5506;

const server = app.listen(port, () => {
  console.log(`up and running ${port}`);
});

process.on("unhandledRejection", err => {
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
