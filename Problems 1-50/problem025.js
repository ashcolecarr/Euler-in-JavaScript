// Project Euler Problem 25
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const COUNT = 1000;

function getFibonacciNumber () {
  var penultimateTerm = 1n;
  var ultimateTerm = 1n;
  var currentTerm;
  var counter = 2;

  while (true) {
    currentTerm = ultimateTerm + penultimateTerm;
    counter++;
    if (currentTerm.toString().length < COUNT) {
      penultimateTerm = ultimateTerm;
      ultimateTerm = currentTerm;
    } else {
      break;
    }
  }

  return counter;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getFibonacciNumber().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
