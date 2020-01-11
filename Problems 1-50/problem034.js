// Project Euler Problem 34
'use-strict';

var http = require('http');
var euler = require('../euler.js');

// Set upper bound to 9! + 8! + 7! + 6! + 5! + 4! + 3! + 2! + 1! since each individual digit is a factorial.
const UPPER_BOUND = 409113n;
// 1! and 2! are not under consideration.
const START = 3n;

function getDigitFactorials () {
  return euler.sum(euler.range(START, UPPER_BOUND, 1n).filter(x => {
    return euler.sum(x.toString().split('').map(n => euler.factorial(BigInt(n)))) === BigInt(x);
  }));
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getDigitFactorials().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
