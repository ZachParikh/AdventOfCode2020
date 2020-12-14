const fs = require("fs");

fs.readFile("inputs/input12.txt", "utf8", (err, data) => {

  const instructions = data.split("\n").map(x => {
    const groups = x.match(/([A-Z])(\d+)/);
    return [groups[1], Number(groups[2])];
  });

  const coordinates = instructions.reduce((coords, instruction) => 
    move(coords, instruction), [0, 0, 10, 1]);

  const manhattan_distance = 
    Math.abs(coordinates[0]) + Math.abs(coordinates[1]);
  console.log(manhattan_distance);
});

function move(coords, instruction) {
  console.log(coords, instruction);
  const [lat, long, wp_lat, wp_long] = coords;
  const [action, arg] = instruction;

  if (arg === 0) {
    return coords;
  }

  switch (action) {
    case "F":
      return [lat + arg * wp_lat, long + arg * wp_long, wp_lat, wp_long];
    case "L":
      return move([lat, long, -wp_long, wp_lat], [action, arg - 90]);
    case "R":
      return move([lat, long, wp_long, -wp_lat], [action, arg - 90]);
    case "N":
      return [lat, long, wp_lat, wp_long + arg];
    case "S":
      return [lat, long, wp_lat, wp_long - arg];
    case "E":
      return [lat, long, wp_lat + arg, wp_long];
    case "W":
      return [lat, long, wp_lat - arg, wp_long];
  }
}
