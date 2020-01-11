// Project Euler Problem 28
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const SPIRAL_SIZE = 1001;

function getDiagonalsSum () {
  var addend = 2;
  var number = 1;
  var sum = 1;

  while (number < SPIRAL_SIZE ** 2) {
    for (var i = 1; i < 5; i++) {
      number += addend;
      sum += number;
    }

    addend += 2;
  }

  return sum;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getDiagonalsSum().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
