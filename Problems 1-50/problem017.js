// Project Euler Problem 17
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const HUNDRED = 'hundred';
const THOUSAND = 'thousand';
const AND = 'and';

const MAX = 1000;

function getNumberLetterCount () {
  var numberString = [];

  for (var i = 1; i <= euler.range(1, MAX).length; i++) {
    if (i < 10) {
      numberString.push(ONES[i]);
    } else if (i >= 10 && i < 20) {
      numberString.push(TEENS[i % 10]);
    } else if (i >= 20 && i < 100) {
      if (i % 10 === 0) {
        numberString.push(TENS[Math.trunc(i / 10)]);
      } else {
        numberString.push(TENS[Math.trunc(i / 10)]);
        numberString.push(ONES[i % 10]);
      }
    } else if (i >= 100 && i < 1000) {
      if (i % 100 === 0) {
        numberString.push(ONES[Math.trunc(i / 100)]);
        numberString.push(HUNDRED);
      } else {
        numberString.push(ONES[Math.trunc(i / 100)]);
        numberString.push(HUNDRED);
        numberString.push(AND);
        if (i % 100 < 10) {
          numberString.push(ONES[i % 100]);
        } else if (i % 100 >= 10 && i % 100 < 20) {
          numberString.push(TEENS[(i % 100) % 10]);
        } else if (i % 100 >= 20 && i % 100 < 100) {
          if ((i % 100) % 10 === 0) {
            numberString.push(TENS[Math.trunc((i % 100) / 10)]);
          } else {
            numberString.push(TENS[Math.trunc((i % 100) / 10)]);
            numberString.push(ONES[(i % 100) % 10]);
          }
        }
      }
    } else if (i === 1000) {
      numberString.push(ONES[Math.trunc(i / 1000)]);
      numberString.push(THOUSAND);
    }
  }

  return numberString.join('').length;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getNumberLetterCount().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
