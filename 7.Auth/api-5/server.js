process.on("uncaughtException", err => {
  console.error(err.message, err.name);
  process.exit(1);
});

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

console.log(`NODE_ENV`, process.env.NODE_ENV);

let DB = process.env.DATABASE;
DB = DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

//connect database
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB connected");
  });

const PORT = process.env.PORT || 5502;

const server = app.listen(PORT, () => {
  console.log(`up an running ${PORT}`);
});

process.on("unhandledRejection", err => {
  console.error(err.message, err.name);
  server.close(() => {
    process.exit(1);
  });
});
