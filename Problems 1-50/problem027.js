// Project Euler Problem 27
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const MAX = 1000;
const MIN = -MAX;

function getCoefficientProduct () {
  var maxSequence = 0;
  var primeProduct = 0;

  // b itself must be prime to account for where n = 0
  var listOfB = euler.primeSieve(MAX);
  // a must be odd since b must be prime to account for n = 1, and it must be even if b = 2
  var listOfA = euler.range(MIN + 1, MAX).filter(a => a % 2 !== 0);

  for (var i = 0; i < listOfA.length; i++) {
    for (var j = 0; j < listOfB.length; j++) {
      var n = 0;

      while (euler.isPrime(Math.abs(n ** 2 + listOfA[i] * n + listOfB[j]))) {
        n++;
      }

      if (n > maxSequence) {
        maxSequence = n;
        primeProduct = listOfA[i] * listOfB[j];
      }
    }
  }

  return primeProduct;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getCoefficientProduct().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
