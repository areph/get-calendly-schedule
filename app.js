'use strict';

const commander = require('commander');

commander.parse(process.argv);
console.log(commander.args[0]);
