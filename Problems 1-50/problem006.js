// Project Euler Problem 6
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const limit = 100;

function squareSumDifference () {
  var numbers = euler.range(1, limit);
  var sumOfSquares = numbers.map(n => n ** 2).reduce(function (sum, val) {
    return sum + val;
  }, 0);
  var squareOfSum = (numbers.reduce(function (sum, val) {
    return sum + val;
  }, 0)) ** 2;

  return squareOfSum - sumOfSquares;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(squareSumDifference().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
