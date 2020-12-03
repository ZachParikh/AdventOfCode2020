const fs = require('fs')

fs.readFile("inputs/input2.txt", 'utf8', (err, data) => {
  const entries = data.split("\n");
  const numValid = entries
    .map(isPasswordValid)
    .reduce((acc, valid) => {
    if (valid) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  console.log(numValid);
})

function isPasswordValid(entry) {
  const matches = entry.match(/(\d+)-(\d+) ([a-z]): ([a-z]*)/);

  if (matches === null) {
    return false;
  }

  const first = Number(matches[1]);
  const second = Number(matches[2]);
  const policyLetter = matches[3];
  const password = matches[4];

  return validatePassword(first, second, policyLetter, password);
}

function validatePassword(first, second, policyLetter, password) {
  return (password[first - 1] === policyLetter) !== 
         (password[second - 1] === policyLetter);
}