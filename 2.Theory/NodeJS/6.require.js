/*
console.log(`args :`, arguments);
console.log(`module :`, require("module"));
*/

//modules.exports
const calc = require("./7.test-module-1");
const calculator = new calc();
console.log(`modules.exports :`, calculator.add(1, 2));

//exports
const calc2 = require("./7.test-module-2");
console.log(`exports :`, calc2.add(1, 2));

//caching
require("./7.test-module-3")();
require("./7.test-module-3")();
require("./7.test-module-3")();
