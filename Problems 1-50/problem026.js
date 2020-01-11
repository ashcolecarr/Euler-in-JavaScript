// Project Euler Problem 26
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const MAX = 1000;

function getRemainders () {
  var remainderWasFound = false;
  var listOfRemainders = [[0], [1]];
  var remainders = [];

  var numbers = euler.range(2, MAX);
  for (var i = 0; i < numbers.length; i++) {
    var divisor = numbers[i];
    var dividend = 1;
    remainders = [];

    // Repeater until divisor divides evenly into dividend.
    while (dividend !== 0) {
      while (dividend < divisor) {
        dividend *= 10;
      }

      dividend = dividend % divisor;

      // Verify whether remainder is already stored.
      if (remainders.includes(dividend)) {
        remainderWasFound = true;
      }

      if (remainderWasFound) {
        remainderWasFound = false;
        break;
      }

      remainders.push(dividend);
    }

    listOfRemainders.push(remainders);
  }

  return listOfRemainders.map(lor => lor.length);
}

function getLongestCycle () {
  var remainderSizes = getRemainders();

  return remainderSizes.indexOf(Math.max(...remainderSizes));
}
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getLongestCycle().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
