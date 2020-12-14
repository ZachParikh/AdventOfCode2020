const fs = require('fs');
const PREAMBLE_SIZE = 25;

fs.readFile("inputs/input9.txt", 'utf8', (err, data) => {
  const xmas = data.split("\n").map(x => Number(x));
  const invalidNumber = findInvalid(xmas);
  
  const contiguous_set = findContiguousSum(invalidNumber, xmas)
    .sort((a, b) => a - b);

  const encryption_weakness = 
    contiguous_set[0] + contiguous_set[contiguous_set.length - 1];
  
  console.log(encryption_weakness);
});

function findContiguousSum(n, xmas) {
  let set;

  for (let i = 0; i < xmas.length; i++) {
    let sum = 0;
    set = [];
    for (const x of xmas.slice(i)) {
      sum += x;

      if (sum > n) {
        break;
      } else if (sum === n) {
        return set;
      } else {
        set.push(x);
      }
    }
  }

  return set;
}

function findInvalid(xmas) {
  let preamble = xmas.slice(0, PREAMBLE_SIZE);
  const numbers = xmas.slice(PREAMBLE_SIZE);

  for (const n of numbers) {
    if (!valid(n, preamble)) {
      return n;
    } else {
      preamble.shift();
      preamble.push(n);
    }
  }

}

function valid(n, preamble) {

  for (let i = 0; i < preamble.length; i++) {
    for (let j = i + 1; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] === n) {
        return true;
      }
    }
  }

  return false;
}