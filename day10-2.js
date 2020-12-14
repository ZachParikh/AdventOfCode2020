const fs = require('fs');

fs.readFile("inputs/input10.txt", 'utf8', (err, data) => {
  const adapters = data.split("\n")
                       .map(x => Number(x))
                       .sort((a, b) => a - b);
  adapters.unshift(0);
  adapters.push(adapters[adapters.length - 1] + 3);

  console.log(adapters);

  const permutations = calculatePermutations(adapters, 0);
  console.log(permutations);

});

let memory = new Map();

function calculatePermutations(adapters, i) {
  if (i === adapters.length - 1) {
    return 1;
  }

  if (memory.has(i)) {
    return memory.get(i);
  }

  let permutations = 0;
  for (let j = i + 1; j < i + 4; j++) {
    if (adapters[j] - adapters[i] <= 3) {
      permutations += calculatePermutations(adapters, j);
    }
  }

  memory.set(i, permutations);
  return permutations;
}