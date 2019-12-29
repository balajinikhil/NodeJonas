const fs = require("fs");
const http = require("http");
const url = require("url");
const createTemplate = require("./createTemplate");

//file system
let data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "UTF-8"));

const overviewTemp = fs.readFileSync(
  `${__dirname}/template/overview.html`,
  "UTF-8"
);

const cardTemp = fs.readFileSync(
  `${__dirname}/template/cardTemplate.html`,
  "UTF-8"
);

const productTemp = fs.readFileSync(
  `${__dirname}/template/product.html`,
  "UTF-8"
);

//callbacks

//overview

//server
const server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  console.log(pathname);

  res.writeHead(200, {
    "Content-type": "text/html"
  });

  //overview
  if (pathname == "/" || pathname == "/overview") {
    let output = data.map(ele => createTemplate(ele, cardTemp));
    let disp = output.join("");
    let out = overviewTemp.replace("%cardTemplate%", disp);
    res.end(out);

    //product
  } else if (pathname == "/product") {
    let out = data[query.id];

    let disp = createTemplate(out, productTemp);

    res.end(disp);
  } else {
    res.writeHead(404, {
      "Content-type": "application/json"
    });

    res.end("Something must be wrong");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server up and running on port 3000");
});
