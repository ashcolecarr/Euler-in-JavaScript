// Project Euler Problem 35
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const MAX = 1000000;

function rotate (list) {
  return list.slice(-1).concat(list.slice(0, -1));
}

function getCircularPrimes () {
  var primes = euler.primeSieve(MAX).map(p => p.toString());

  var circularPrimeCount = 0;
  for (let prime of primes) {
    var isCircularPrime = true;
    var rotated = prime;

    while (true) {
      rotated = rotate(rotated);
      if (rotated === prime) {
        break;
      }

      if (!euler.isPrime(parseInt(rotated))) {
        isCircularPrime = false;
        break;
      }
    }

    if (isCircularPrime) {
      circularPrimeCount++;
    }
  }

  return circularPrimeCount;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getCircularPrimes().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
