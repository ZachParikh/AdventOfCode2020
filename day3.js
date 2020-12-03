const fs = require('fs')
const TREE = '#';

fs.readFile("inputs/input3.txt", 'utf8', (err, data) => {
  const rows = data.split("\n");
  const length = rows[0].length;

  const [numTrees, _] = rows.reduce(([numTrees, position], row) => {
    if (row[position] === TREE) {
      return [numTrees + 1, (position + 3) % length];
    } else {
      return [numTrees, (position + 3) % length];
    }
  }, [0, 0]);

  console.log(numTrees);

});


