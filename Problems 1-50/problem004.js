// Project Euler Problem 4
'use-strict';

var http = require('http');

const minimum = 100;
const maximum = 999;

function palindromeProduct () {
  var numbers = [];
  for (var i = minimum; i <= maximum; i++) {
    for (var j = minimum; j <= maximum; j++) {
      numbers.push(i * j);
    }
  }

  var uniqueNumbers = new Set(numbers);
  var palindromes = [...uniqueNumbers].map(x => x.toString())
    .filter(x => x.localeCompare(x.split('').reverse().join('')) === 0);

  return palindromes.map(x => parseInt(x)).reduce((max, value) => {
    return Math.max(max, value);
  }, 0);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(palindromeProduct().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
