const fs = require("fs");
/*We have imported the file-system object through 
require() method this object consists of all the methods and properties for node to read and write file



Reading a file synchronous way
fs.readFileSync('path', 'char encoding')
readFileSync is a method of file system which has 2 parameters 
path - the path of the file which has to be read 
char-encoding - utf8 for txt

Writing a file synchronous way
fs.writeFileSync('path' , input)
similar to read file it accepts 2 parameters 
path- if there is no such file existing it creates the file
input - whatever we want to write to the file

*/
let readingFile = fs.readFileSync("./text.txt", "UTF-8");

console.log(readingFile);

let writingFile = `I have started learning nodeJS on ${new Date()}`;

fs.writeFileSync("./text.txt", writingFile);
console.log("done writing");
