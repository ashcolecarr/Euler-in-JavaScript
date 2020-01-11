// Project Euler Problem 30
'use-strict';

var http = require('http');
var euler = require('../euler.js');

// Set the upper limit to 6 * (9 ^ 5) since 7 * (9 ^ 5) is not a 7-digit number.
const UPPER_LIMIT = 354294;

function getDigitFifthPowersSum () {
  return euler.sum(euler.range(2, UPPER_LIMIT).filter(n => euler.sum(n.toString().split('').map(s => parseInt(s) ** 5)) === n));
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getDigitFifthPowersSum().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
