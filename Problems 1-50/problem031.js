// Project Euler Problem 31
'use-strict';

var http = require('http');
var euler = require('../euler.js');

const TOTAL_MONEY = 200;
const COINS = [1, 2, 5, 10, 20, 50, 100, 200];

// The coin change algorithm
function countChange (money, change) {
  if (money < 0 || change <= 0) {
    return 0;
  } else if (money === 0) {
    return 1;
  } else {
    return countChange(money, change - 1) + countChange(money - COINS[change - 1], change);
  }
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(countChange(TOTAL_MONEY, COINS.length).toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
