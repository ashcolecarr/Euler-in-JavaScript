// Project Euler Problem 10
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const MAXIMUM = 2000000;

function getSumOfPrimes (number) {
  var primes = euler.primeSieve(number);

  return primes.reduce((sum, val) => {
    return sum + val;
  }, 0);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getSumOfPrimes(MAXIMUM).toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
