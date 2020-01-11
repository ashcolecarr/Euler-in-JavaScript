// Project Euler Problem 33
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const MIN = 10;
const MAX = 99;

// Equality test for two floating-point values.
function areEqual (a, b) {
  const PRECISION = 0.001;

  return Math.abs(a - b) <= PRECISION;
}

function hasCommonDigit (num, denom) {
  return Math.trunc(num / MIN) === denom % MIN || num % MIN === Math.trunc(denom / MIN);
}

// Screen out trivial fractions and any fraction without a common digit as they are not under consideration.
function generateFractions () {
  var fractions = [];
  var numbers = euler.range(MIN, MAX);

  for (let a of numbers) {
    for (let b of numbers) {
      if (a < b && (a % MIN !== 0 && b % MIN !== 0) && hasCommonDigit(a, b)) {
        fractions.push(Array.of(a, b));
      }
    }
  }

  return fractions;
}

function getCuriousFractions () {
  var curiousFractions = [];
  var fractionProduct = [1, 1];

  var fractions = generateFractions();
  for (let fraction of fractions) {
    if (areEqual(fraction[0] / fraction[1], Math.trunc(fraction[0] / MIN) / (fraction[1] % MIN))) {
      curiousFractions.push(fraction);
    } else if (areEqual(fraction[0] / fraction[1], (fraction[0] % MIN) / Math.trunc(fraction[1] / MIN))) {
      curiousFractions.push(fraction);
    }
  }

  for (let curiousFraction of curiousFractions) {
    fractionProduct[0] *= curiousFraction[0];
    fractionProduct[1] *= curiousFraction[1];
  }

  return fractionProduct[1] / euler.gcd(fractionProduct[0], fractionProduct[1]);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getCuriousFractions().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
