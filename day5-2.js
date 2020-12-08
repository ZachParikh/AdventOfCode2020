const fs = require("fs");

fs.readFile("inputs/input5.txt", "utf8", (err, data) => {
  const boarding_passes = 
    data.split("\n")
        .map(boarding_pass => Array.from(boarding_pass))
        .filter(boarding_pass => boarding_pass.length > 0);

  const seat_ids = boarding_passes.map(decodeBoardingPass)
                                  .map(([row, column]) => row * 8 + column);

  const my_seat = findMySeat(seat_ids);
  console.log(my_seat);

});

function findMySeat(seat_ids) {
  sorted_seats = seat_ids.sort();

  for (let i = 1; i < sorted_seats.length; i++) {
    if (sorted_seats[i - 1] + 2 === sorted_seats[i]) {
      return sorted_seats[i] - 1;
    }
  }

  return -1;
}

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