// Project Euler Problem 19
'use-strict';

var http = require('http');

const CENTURY_START = 1901;
const CENTURY_END = 2000;
const DAYS_IN_WEEK = 7;

function addLeapDay (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 1 : 0;
}

function countSundays () {
  var totalSundays = 0;

  // The first Sunday of 1901 was 6 January.
  var day = 6;
  var year = CENTURY_START;

  while (year <= CENTURY_END) {
    var january = 1;
    var february = 32;
    var march = 60 + addLeapDay(year);
    var april = 91 + addLeapDay(year);
    var may = 121 + addLeapDay(year);
    var june = 152 + addLeapDay(year);
    var july = 182 + addLeapDay(year);
    var august = 213 + addLeapDay(year);
    var september = 244 + addLeapDay(year);
    var october = 274 + addLeapDay(year);
    var november = 305 + addLeapDay(year);
    var december = 335 + addLeapDay(year);
    var fullYear = 365 + addLeapDay(year);

    while (day < fullYear) {
      switch (day) {
        case january:
        case february:
        case march:
        case april:
        case may:
        case june:
        case july:
        case august:
        case september:
        case october:
        case november:
        case december:
          totalSundays++;
          break;
        default:
          break;
      }

      day += DAYS_IN_WEEK;
    }

    // Reset day counter for next year.
    day -= fullYear;
    year++;
  }

  return totalSundays;
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();
  res.write(countSundays().toString());

  var end = new Date().getTime();
  res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
  res.end();
}).listen(8080);
