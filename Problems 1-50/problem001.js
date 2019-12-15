// Project Euler Problem 1
'use-strict';

var http = require('http');

const maximumValue = 1000;
const reducer = (acc, val) => acc + val;

function multiplesSum () {
  var multiples = [];
  for (var i = 3; i < maximumValue; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      multiples.push(i);
    }
  }

  return multiples.reduce(reducer);
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  var start = new Date().getTime();
  res.write(multiplesSum().toString());
  
  var end = new Date().getTime();
  res.write(`\nProgram execution took ${end - start} seconds.`);
  res.end();
}).listen(8080);
