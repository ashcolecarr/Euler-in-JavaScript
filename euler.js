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
  },

  flatten: function (array) {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    if (Array.isArray(array[0])) {
      return (this.flatten(array[0])).concat(this.flatten(array.slice(1)));
    } else {
      return [array[0]].concat(this.flatten(array.slice(1)));
    }
  },

  factors: function (n) {
    var step = n % 2 === 1 ? 2 : 1;

    var candidates = this.range(1, Math.trunc(Math.sqrt(n)) + 1, step);
    var numbers = [];
    for (var i = 0; i < candidates.length; i++) {
      if (n % candidates[i] === 0) {
        numbers.push([candidates[i], Math.trunc(n / candidates[i])]);
      }
    }

    return [...new Set(this.flatten(numbers))];
  },

  sum: function (array) {
    if (!Array.isArray(array)) {
      return 0;
    }

    return array.reduce((sum, val) => {
      return sum + val;
    }, 0);
  },

  factorial: function (n) {
    if (n < 0n) {
      throw new Error('Value cannot be negative.');
    } else if (n === 1n || n === 0n) {
      return 1n;
    } else {
      return n * this.factorial(n - 1n);
    }
  },

  /* Get permutations using Heap's algorithm. 
   * Note: permutations are not sorted.
   */
  permutations: function (val, size = val.length) {
    if (size <= 1) {
      return [val.map(v => v.toString()).join('')];
    }

    var result = [];
    var permute = val;
    for (var i = 0; i < size; i++) {
      let permutations = this.permutations(permute, size - 1);
      for (var j = 0; j < permutations.length; j++) {
        result.push(permutations[j]);
      }

      if (size % 2 === 1) {
        let temp = permute[0];
        permute[0] = permute[size - 1];
        permute[size - 1] = temp;
      } else {
        let temp = permute[i];
        permute[i] = permute[size - 1];
        permute[size - 1] = temp;
      }
    }

    return result;
  }
};
