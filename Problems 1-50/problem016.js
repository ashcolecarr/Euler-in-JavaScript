// Project Euler Problem 16
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const POWER = 1000n;

function getPowerDigitSum () {
  return euler.sum((2n ** POWER).toString().split('').map(n => parseInt(n)));
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getPowerDigitSum().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
