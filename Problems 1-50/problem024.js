// Project Euler Problem 24
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const POSITION = 1000000;
const VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getNthPermutation (permutations, position) {
  if (position < 0 || position > permutations.length) {
    throw new Error('Position cannot be outside the bounds of the array.');
  }

  return permutations[position - 1];
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  let allPermutations = euler.permutations(VALUES);
  allPermutations.sort((a, b) => a - b);
  res.write(getNthPermutation(allPermutations, POSITION).toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
