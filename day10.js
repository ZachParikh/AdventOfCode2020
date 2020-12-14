const fs = require('fs');

fs.readFile("inputs/input10.txt", 'utf8', (err, data) => {
  const adapters = data.split("\n")
                       .map(x => Number(x))
                       .sort((a, b) => a - b);

  const wallAdapterJolts = 0;
  const [oneJoltDiffs, threeJoltDiffs] = 
    connectAdapters(adapters, [0, 0], wallAdapterJolts);

  console.log([oneJoltDiffs, threeJoltDiffs]);
  console.log(oneJoltDiffs * threeJoltDiffs);

});

function connectAdapters(adapters, [oneJoltDiffs, threeJoltDiffs], prevJolts) {

  if (adapters.length === 0) {
    return [oneJoltDiffs, threeJoltDiffs + 1];
  }

  const nextJolts = adapters[0];
  const diff = nextJolts - prevJolts;
  if (diff === 1) {
    return connectAdapters(adapters.slice(1), 
                           [oneJoltDiffs + 1, threeJoltDiffs], 
                           nextJolts);
  } else if (diff === 3) {
    return connectAdapters(adapters.slice(1), 
                           [oneJoltDiffs, threeJoltDiffs + 1], 
                           nextJolts);
  } else {
    return connectAdapters(adapters.slice(1), 
                           [oneJoltDiffs, threeJoltDiffs],
                           nextJolts);
  }
}