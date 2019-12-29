let start = "Hello World";
console.log(start);

/*
Modules 
-Additional functionalities of node will be stored as modules which we can use by calling the require method


require('moduleName') - 
-require method returns specified module object which will be stored in the variable


fs- file system
-It is a module consisting of all the functionalities needed to read and write the data from a file


more - nodejs.org documentation
*/

const fs = require("fs");
console.log(`file-system`, fs);
