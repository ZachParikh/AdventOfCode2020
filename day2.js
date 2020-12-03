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

  const min = Number(matches[1]);
  const max = Number(matches[2]);
  const policyLetter = matches[3];
  const password = matches[4];

  return validatePassword(min, max, policyLetter, password);
}

function validatePassword(min, max, policyLetter, password) {
  let count = 0;

  for (const letter of password) {
    if (letter === policyLetter) {
      count += 1;

      if (count > max) {
        return false;
      }
    }
  }

  if (count < min) {
    return false;
  } else {
    return true;
  }
}