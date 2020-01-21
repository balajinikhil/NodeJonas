const fs = require("fs");

/*fs.readFile('PATH' , 'char encoding', function(err,data){
  //code
})

readFile has a callback function which will run in background till the task is done and once it is done the callback will be executed

callback function has 2 parameters
err - holds errors if any
data - the data which is returned after reading the file

ERROR FIRST CALLBACK
Since it holds error as 1st parameter it is called as error first callback




fs.writeFile('PATH', 'what we wanted to right', 'character-encoding', (err)=>{
  //code
})

same as readFile since there will be no data data parameter is not available in the callback 

second argument will be what we want to write inside the file
*/

fs.readFile("./text.txt", "UTF-8", (err, data) => {
  if (err) {
    console.log(`ERROR`, err);
    return;
  }
  console.log(data);
  //passing another inside the callback
  fs.readFile("./text2.txt", "UTF-8", (err, data) => {
    console.log(data);

    //passing write inside this callback
    fs.writeFile(
      "./text3.txt",
      `Writing through asynchronous write method at ${new Date()}`,
      "UTF-8",
      err => {
        if (err) console.log(err);
        console.log(`done writing`);
      }
    );
  });
});

console.log(`Node is still reading...!!!`);
