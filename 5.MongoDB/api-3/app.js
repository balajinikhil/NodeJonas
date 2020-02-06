const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoute");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

//
app.get("/", (req, res) => {
  res.send("Hello World");
});
//

app.use("/api/v1/tours", tourRoutes);

module.exports = app;
