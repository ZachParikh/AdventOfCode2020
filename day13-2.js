"use strict";
const fs = require("fs");

fs.readFile("inputs/input13.txt", "utf8", (err, data) => {
  let ids = data.split("\n")[1];
  let offset = 0;
  ids = ids.split(",")
    .map(id => {
      return {id, offset: offset++};
    })
    .filter(({id}) => id !== "x")
    .map(bus => {
      return {id: Number(bus.id), offset: bus.offset};
    })
    .sort((a, b) => b.id - a.id);

  console.log(ids);
  const timestamp = findTimestamp(ids);

  console.log(timestamp);
});

function findTimestamp(ids) {
  let i = 0;
  let step = ids[i].id;
  let timestamp = step - ids[i].offset;

  for (const bus of ids.slice(1)) {
  
    const {id, offset} = bus
    
    while ((timestamp + offset) % id !== 0) {
      timestamp += step;
    }

    step *= id;
  }

  return timestamp;

}
