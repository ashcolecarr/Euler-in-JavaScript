// Project Euler Problem 14
'use-strict';

var http = require('http');

const LIMIT = 1000000;

function getCollatzSequence () {
  var final = 0;
  var interim = 0;
  var finalCount = 0;
  var count = 0;
  var currentNumber = LIMIT - 1;

  while (true) {
    // Skip even numbers since they will have shorter sequences.
    currentNumber -= 2;
    interim = currentNumber;
    count = 0;

    // Set lower bound, since Collatz sequences of lower values will have been covered by higher values.
    if (interim * 3 < LIMIT) {
      break;
    }

    while (interim > 1) {
      if (interim % 2 === 0) {
        interim /= 2;
      } else {
        interim = 3 * interim + 1;
      }

      count++;
    }
    count++;

    if (count > finalCount) {
      finalCount = count;
      final = currentNumber;
    }
  }

  return final;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getCollatzSequence().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
