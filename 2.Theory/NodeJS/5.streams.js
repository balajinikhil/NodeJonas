const server = require("http").createServer();
const fs = require("fs");

server.on("request", (req, res) => {
  console.log(req.url);

  /*  SOLUTION - 1
  fs.readFile("Streams.txt", (err, data) => {
    res.end(data);
  });
*/

  /* SOLUTION - 2
  const readable = fs.createReadStream("Streams.txt");

  readable.on("data", chunck => {
    res.write(chunck);
  });

  readable.on("end", () => {
    res.end();
  });

  readable.on("error", err => {
    console.log(err);

    res.statusCode = 500;
    res.end("File not Found!!");
  });
  */

  /*Sometimes when we are dealing with large data node may take longer time to write, response can't send data as fast as it is recieving it this leads to BACK PRESSURE problem,
  We can overcome this using pipe() function
   */

  const readable = fs.createReadStream("Streams.txt");
  readable.pipe(res);
  //readableStreamVariable.pipe(writeDestination)
});

server.listen(2200, "127.0.0.1", () => {
  console.log("running 2200...");
});
