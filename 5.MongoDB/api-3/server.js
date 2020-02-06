const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");

let DB = process.env.DATABASE;
DB = DB.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("DB not connected", err);
  });

const PORT = 5500 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Up and running ${PORT}`);
});
