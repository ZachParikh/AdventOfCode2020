// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.

const fs = require('fs')
const TREE = '#';

fs.readFile("inputs/input3.txt", 'utf8', (err, data) => {
  const rows = data.split("\n");
  const length = rows[0].length;
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  
  let numTrees = 1;
  for (let [right, down] of slopes) {
    let count = countTrees(rows, right, down);
    numTrees *= count;
    console.log(count, numTrees);
  }
});


function countTrees(rows, right, down) {
  let position = 0;
  let count = 0;
  const length = rows[0].length;
  for (let i = 0; i < rows.length; i += down) {
    const row = rows[i];

    if (row[position] === TREE) {
      count += 1;
    }

    position = (position + right) % length;
  }

  return count;
}