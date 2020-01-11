// Project Euler Problem 29
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const MAX = 100;

function getDistinctPowers () {
  var numberList = euler.range(2, MAX);

  var powers = [];
  for (var i = 0; i < numberList.length; i++) {
    for (var j = 0; j < numberList.length; j++) {
      powers.push(BigInt(numberList[i]) ** BigInt(numberList[j]));
    }
  }

  return [...new Set(powers)].length;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getDistinctPowers().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
