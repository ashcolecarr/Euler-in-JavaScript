// Project Euler Problem 12
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const DIVISORS = 500;

function getDivisibleTriangularNumber () {
  var triangleNumbers = [1];
  while (euler.factors(triangleNumbers.reduce((sum, val) => {
    return sum + val;
  }, 0)).length <= DIVISORS) {
    triangleNumbers.push(parseInt(triangleNumbers.slice(-1)) + 1);
  }

  return triangleNumbers.reduce((sum, val) => {
    return sum + val;
  }, 0);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getDivisibleTriangularNumber().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
