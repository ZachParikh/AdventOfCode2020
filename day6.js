const fs = require("fs");

fs.readFile("inputs/input6.txt", "utf8", (err, data) => {
  const answers = data.split("\n\n")
                      .map(group => group.split("\n")
                                         .map(person => Array.from(person)))
                      .map(combineAnswers);
  const numAnswers = 
    answers.reduce((acc, groupAnswers) => acc + groupAnswers.size, 0);

  console.log(numAnswers);
});

function combineAnswers(group) {
  return group.reduce((acc, person) => {
    person.map(answer => acc.add(answer));
    return acc;
  }, new Set());
}