'use-strict';

module.exports = {
  range: function (start, end, step = 1) {
    if (step < 0) {
      return [];
    }

    var values = [];
    if (start > end) {
      for (let i = start; i >= end; i -= step) {
        values.push(i);
      }
    } else {
      for (let i = start; i <= end; i += step) {
        values.push(i);
      }
    }

    return values;
  },

  primeSieve: function (n) {
    if (n < 2) {
      return [];
    } else if (n === 2) {
      return [2];
    }

    var sieve = Array(n + 1).fill(true);
    for (var i = 3; i <= Math.ceil(Math.sqrt(n)); i += 2) {
      for (var j = 3; j <= Math.ceil(n / i); j += 2) {
        sieve[(i * j)] = false;
      }
    }

    var primeNums = [2];
    for (var k = 3; k < sieve.length; k += 2) {
      if (sieve[k]) {
        primeNums.push(k);
      }
    }

    return primeNums;
  },

  isPrime: function (n) {
    if (n < 2) {
      return false;
    } else if (n % 2 === 0) {
      return n === 2;
    }

    var p = 3;
    while (p * p <= n) {
      if (n % p === 0) {
        return false;
      }
      p += 2;
    }

    return true;
  },

  primeFactors: function (n) {
    var factors = [];
    var d = 2;

    while (n > 1) {
      while (n % d === 0) {
        factors.push(d);
        n /= d;
      }

      d++;
      if (d * d > n) {
        if (n > 1) {
          factors.push(n);
        }
        break;
      }
    }

    return factors;
  }
};
