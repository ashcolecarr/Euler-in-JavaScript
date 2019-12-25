// Project Euler Problem 3
'use-strict';

var http = require('http');

const factoredNumber = 600851475143;

function primeFactors (n) {
  var factors = [];
  var d = 2;

  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }

    d++;
    if (d * d > n) {
      if (n > 1) {
        factors.push(n);
      }
      break;
    }
  }

  return factors.reduce((max, value) => {
    return Math.max(max, value);
  }, 0);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(primeFactors(factoredNumber).toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
