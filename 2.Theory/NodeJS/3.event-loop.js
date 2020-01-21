const fs = require("fs");

process.env.UV_THREADPOOL_SIZE = 4; //to change thread pool default number

fs.readFile("Event-Loop.txt", () => {
  console.log("Entered callback");

  setTimeout(() => {
    console.log("timeout-1");
  }, 0);

  setImmediate(() => {
    console.log("I am set Immediate-1");
    //waiting in the i/o polling
  });

  setTimeout(() => {
    console.log("timeout-2");
  });
});
