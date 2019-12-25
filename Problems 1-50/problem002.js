// Project Euler Problem 2
'use-strict';

var http = require('http');

const limit = 4000000;

function evenFibonacciSum () {
  var fibonacci = [1, 1];
  for (var i = 2; ; i++) {
    var newTerm = fibonacci[i - 1] + fibonacci[i - 2];
    if (newTerm > limit) {
      break;
    }

    fibonacci.push(newTerm);
  }

  return fibonacci.filter(term => term % 2 === 0).reduce(function (sum, term) {
    return sum + term;
  }, 0);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(evenFibonacciSum().toString());

  var end = new Date().getTime();
  res.write(`Program execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
