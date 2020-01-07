// Project Euler Problem 20
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const NUMBER = 100n;
function getFactorialDigitSum () {
  return euler.sum(euler.factorial(NUMBER).toString().split('').map(n => parseInt(n)));
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getFactorialDigitSum().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
