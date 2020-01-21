const http = require("http");

const server = http.createServer((req, res) => {
  let urlTag = req.url;

  if (urlTag == "/" || urlTag == "/hello") {
    res.end("Hello World");
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "Hello People"
    });
    res.end("<h3> Page Not Found </h3>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server up and running");
});

/*Routing
-Implementing different actions for different URL

req.url 
-holds the value of request url which we are requesting from the browser


Whenever the user tries to acess the url which is not present a  404 page not found is shown 

This 404 is a http status code, Which will be present in the  http header

http header 
-It contains info about response

res.writeHead(statusCode, {
    'header-name':'value',
    'content-type':'text/html'
})

2 value in header object tells the browser that the response is an html type of data,

We can create our own custom headers and give sepecified values



*/
