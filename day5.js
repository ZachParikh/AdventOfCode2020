const fs = require("fs");

fs.readFile("inputs/input5.txt", "utf8", (err, data) => {
  const boarding_passes = 
    data.split("\n")
        .map(boarding_pass => Array.from(boarding_pass))
        .filter(boarding_pass => boarding_pass.length > 0);

  const seat_positions = boarding_passes.map(decodeBoardingPass);
  const max_seat_id = seat_positions.map(([row, column]) => row * 8 + column)
                                    .reduce((max, id) => {
                                      if (id > max) {
                                        return id
                                      } else {
                                        return max
                                      }
                                    });
console.log(max_seat_id);
});

function decodeBoardingPass(boarding_pass) {
  const rows = 127;
  const columns = 7;
  let row;
  [row, boarding_pass] = getRow(boarding_pass, 0, rows);

  let column;
  [column, boarding_pass] = getColumn(boarding_pass, 0, columns);

  return [row, column];
}

function getRow(boarding_pass, front, back) {
  const letter = boarding_pass[0];
  boarding_pass = boarding_pass.slice(1);
  
  if (letter === "F") {
    const middle = Math.floor((front + back) / 2);

    if (middle === front) {
      return [middle, boarding_pass];
    }

    return getRow(boarding_pass, front, middle);
  } else if (letter === "B") {
    const middle = Math.ceil((front + back) / 2);

    if (middle === back) {
      return [middle, boarding_pass];
    }

    return getRow(boarding_pass, middle, back);
  }

  return [null, null]
}

function getColumn(boarding_pass, left, right) {
  const letter = boarding_pass[0];
  boarding_pass = boarding_pass.slice(1);

  if (letter === "L") {
    const middle = Math.floor((left + right) / 2);

    if (middle === left) {
      return [middle, boarding_pass];
    }

    return getColumn(boarding_pass, left, middle);
  } else if (letter === "R") {
    const middle = Math.ceil((left + right) / 2);

    if (middle === right) {
      return [middle, boarding_pass];
    }

    return getColumn(boarding_pass, middle, right);
  }

  return [null, null];
}