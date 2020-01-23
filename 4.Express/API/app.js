const express = require("express");
const morgan = require("morgan");

const tourRoutes = require("./routes/routeTours");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/home", express.static(`${__dirname}/public/index.html`));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
