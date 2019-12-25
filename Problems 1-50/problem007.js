// Project Euler Problem 7
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const POSITION = 10001;

// All primes have the form 6(n) +/- 1 except for 2 and 3.
function getPrime () {
  var primeCount = 2;
  var candidateCount = 1;
  var finalPrime = 0;

  while (primeCount < POSITION) {
    if (euler.isPrime(6 * candidateCount - 1)) {
      primeCount++;
      if (primeCount === POSITION) {
        finalPrime = 6 * candidateCount - 1;
      }
    }

    if (euler.isPrime(6 * candidateCount + 1)) {
      primeCount++;
      if (primeCount === POSITION) {
        finalPrime = 6 * candidateCount + 1;
      }
    }

    candidateCount++;
  }

  return finalPrime;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getPrime().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
