const dotenv = require("dotenv");
const mongoose = require("mongoose");
//IMPORT CONFIG.ENV
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = process.env.PORT || 5501;

let DB = process.env.DATABASE;
DB = DB.replace("<PASSWORD>", process.env.PASSWORD);

//CONNECT TO DATABASE
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("DB connection error", err);
  });

//HOST SERVER
app.listen(port, () => {
  console.log(`server up and running ${port}`);
});
