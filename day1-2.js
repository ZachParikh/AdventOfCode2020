const fs = require('fs')

fs.readFile("inputs/input1.txt", 'utf8', (err, data) => {
  const entries = data.split("\n").map(x => Number(x));
  console.log(entries);
  const [e1, e2, e3] = findThree(entries);
  console.log(e1 * e2 * e3);
})

function findThree(entries) {
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      for (let k = j + 1; k < entries.length; k++) {

        if (entries[i] + entries[j] + entries[k] === 2020) {
          return [entries[i], entries[j], entries[k]];
        }
      }
    }
  }

  return [null, null, null];
}