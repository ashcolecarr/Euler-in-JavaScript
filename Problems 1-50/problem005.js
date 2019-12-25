// Project Euler Problem 5
'use-strict';

var http = require('http');

const limit = 20;

function primes (n) {
  if (n < 2) {
    return [];
  } else if (n === 2) {
    return [2];
  }

  var sieve = Array(n + 1).fill(true);
  for (var i = 3; i <= Math.ceil(Math.sqrt(n)); i += 2) {
    for (var j = 3; j <= Math.ceil(n / i); j += 2) {
      sieve[(i * j)] = false;
    }
  }

  var primeNums = [2];
  for (var k = 3; k < sieve.length; k += 2) {
    if (sieve[k]) {
      primeNums.push(k);
    }
  }

  return primeNums;
}

function getSmallestDivisible () {
  var primeNumbers = primes(limit);
  // Exclude the primes as they will be already included.
  var numbers = [];
  for (var i = 2; i <= limit; i++) {
    if (primeNumbers.includes(i)) {
      continue;
    }

    numbers.push(i);
  }

  var product = primeNumbers.reduce(function (x, y) {
    return x * y;
  }, 1);
  var smallest = product;

  var found = false;
  while (!found) {
    for (var j = 0; j < numbers.length; j++) {
      if (smallest % numbers[j] !== 0) {
        smallest += product;
        break;
      } else if (numbers[j] === limit) {
        found = true;
      }
    }
  }

  return smallest;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getSmallestDivisible().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
