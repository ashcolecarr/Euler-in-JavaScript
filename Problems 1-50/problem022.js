// Project Euler Problem 22
'use-strict';

const FILENAME = 'names.txt';
const ALPHABET = ['\0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 

var http = require('http');
var fs = require('fs');
var path = require('path');
var euler = require('../euler.js');

function getFileContents () {
  return new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, FILENAME);

    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        resolve(data);
      }
    });
  });
}

function getNameScore (name) {
  return euler.sum(name.split('').map(n => ALPHABET.indexOf(n)));
}

function getAllNamesScore () {
  return getFileContents().then(data => {
    var nameData = data.toString().split('').map(c => c === '"' ? '' : c).join('');

    var names = nameData.split(',');
    names.sort();

    var score = 0;
    for (var i = 0; i < names.length; i++) {
      score += (i + 1) * getNameScore(names[i]);
    }

    return score;
  }).catch(error => console.log(error));
}

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var start = new Date().getTime();

  getAllNamesScore().then(result => {
    res.write(result.toString());

    var end = new Date().getTime();
    res.write(`\nProgram execution took ${(end - start) / 1000} seconds.`);
    res.end();
  });
}).listen(8080);
