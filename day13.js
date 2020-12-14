const fs = require("fs");

fs.readFile("inputs/input13.txt", "utf8", (err, data) => {
  let [timestamp, ids] = data.split("\n");
  timestamp = Number(timestamp);
  ids = ids.split(",")
    .filter(id => id !== "x")
    .map(id => Number(id))
    .map(id => {
      return {id, time: id - (timestamp % id)}
    });

  const {id, time} = ids.reduce((min, bus) => {
    if (bus.time < min.time) {
      return bus;
    } else {
      return min;
    }
  });

  console.log(id * time);
  
});