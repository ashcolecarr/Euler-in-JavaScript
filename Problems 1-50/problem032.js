// Project Euler Problem 32
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getNumber (start, end, numbers) {
  return parseInt([...numbers.slice(start, end)].reduce((x, y) => {
    return x.toString() + y.toString();
  }, ''));
}
function getPandigitalProducts () {
  var pandigitals = euler.permutations(DIGITS);

  var pandigitalProducts = [];
  var product = 0;

  for (var i = 0; i < pandigitals.length; i++) {
    product = getNumber(0, 1, pandigitals[i]) * getNumber(1, 5, pandigitals[i]);
    if (product === getNumber(5, 9, pandigitals[i])) {
      pandigitalProducts.push(product);
    }

    product = getNumber(0, 2, pandigitals[i]) * getNumber(2, 5, pandigitals[i]);
    if (product === getNumber(5, 9, pandigitals[i])) {
      pandigitalProducts.push(product);
    }
  }

  return euler.sum([...new Set(pandigitalProducts)]);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getPandigitalProducts().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
