// Project Euler Problem 21
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const LIMIT = 10000;

function evaluateAmicableNumberSum () {
  var numbers = euler.range(2, LIMIT);
  var amicableSum = 0;

  for (var i = 0; i < numbers.length; i++) {
    var num1 = euler.sum(euler.factors(numbers[i])) - numbers[i];

    var num2 = euler.sum(euler.factors(num1)) - num1;

    if (num2 === numbers[i] && num1 !== numbers[i]) {
      amicableSum += numbers[i];
    }
  }

  return amicableSum;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(evaluateAmicableNumberSum().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
