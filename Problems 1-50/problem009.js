// Project Euler Problem 9
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const TRIPLET_SUM = 1000;

function getTripletProduct () {
  var a = euler.range(1, 400);
  var b = euler.range(1, 400);
  var product = 0;

  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (a[i] ** 2 < b[j] ** 2 && (TRIPLET_SUM - (a[i] + b[j])) ** 2 === a[i] ** 2 + b[j] ** 2) {
        product = a[i] * b[j] * (TRIPLET_SUM - (a[i] + b[j]));
      }
    }
  }

  return product;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(getTripletProduct().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
