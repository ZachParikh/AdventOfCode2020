const fs = require('fs')

fs.readFile("inputs/input1.txt", 'utf8', (err, data) => {
  const entries = data.split("\n").map(x => Number(x));
  console.log(entries);
  const [e1, e2] = findTwo(entries);
  console.log(e1 * e2);
})

function findTwo(entries) {
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {

      if (entries[i] + entries[j] === 2020) {
        return [entries[i], entries[j]];
      }

    }
  }

  return [null, null];
}