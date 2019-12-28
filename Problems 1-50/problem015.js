// Project Euler Problem 15
'use-strict';

var http = require('http');

const GRID_LENGTH = 20;

function factorial (n) {
  if (n < 0) {
    throw new Error('Value cannot be negative.');
  } else if (n === 1 || n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

/*
 * There are n steps in the grid, with n / 2 down and n / 2 right.
 * Therefore, the combination is n! / (n / 2)! / (n / 2)! since it goes only one way.
 */
function calculateGridPaths () {
  return (factorial(GRID_LENGTH + GRID_LENGTH) / factorial(GRID_LENGTH)) / factorial(GRID_LENGTH);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(calculateGridPaths().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
