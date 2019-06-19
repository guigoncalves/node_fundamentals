const validator = require('validator');
const getNotes = require("./notes.js");
const chalk = require("chalk");

console.log(validator.isEmail("email@gmail.com"));
console.log(getNotes());
console.log(chalk.green("success"));