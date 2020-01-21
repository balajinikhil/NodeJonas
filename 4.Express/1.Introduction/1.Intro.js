const express = require("express");
//require express module after installing it from npm
const app = express();
//express module is a function invoke it to a app
const port = 3000;

/*app.METHOD('Route', cb(request,response){

})*/

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/json", (req, res) => {
  res.status(200).json({
    hello: "world"
  });
});

app.post("/", (req, res) => {
  res.end("I am post request");
});

//app.listen(port, cb(){})
app.listen(port, () => {
  console.log(`Up and running ${port}...`);
});
