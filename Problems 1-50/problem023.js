// Project Euler Problem 23
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const UPPER_LIMIT = 20161; // Every number above this can be written as the sum of two abundant numbers.
const LOWER_LIMIT = 12; // The smallest abundant number.

function getAbundants () {
  return euler.range(LOWER_LIMIT, UPPER_LIMIT).filter(n => euler.sum(euler.factors(n)) - n > n);
}

// Mark all numbers which can be expressed as the sum of two abundant numbers.
function markAbundants (abundants) {
  var markers = Array(UPPER_LIMIT + 1).fill(false);

  for (var i = 0; i < abundants.length; i++) {
    for (var j = i; j < abundants.length; j++) {
      // Mark the value as the sum of two abundants.
      if (abundants[i] + abundants[j] <= UPPER_LIMIT) {
        markers[abundants[i] + abundants[j]] = true;
      } else {
        break;
      }
    }
  }

  return markers;
}

function sumNonAbundants (markers) {
  var nonAbundantsSum = 0;

  for (var i = 0; i < markers.length; i++) {
    if (markers[i] === false) {
      nonAbundantsSum += i;
    }
  }

  return nonAbundantsSum;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(sumNonAbundants(markAbundants(getAbundants())).toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
