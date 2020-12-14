const fs = require('fs');

const EMPTY = 'L';
const OCCUPIED = '#';

fs.readFile("inputs/input11.txt", 'utf8', (err, data) => {
  const seats = data.split("\n").map(s => Array.from(s));

  const finalSeats = applyRules(seats);
  // console.log(finalSeats);
  const numOccupied = finalSeats.reduce((acc, row) => 
    acc + row.reduce((row_acc, seat) => {
      if (seat === OCCUPIED) {
        return row_acc + 1;
      } else {
        return row_acc;
      }
    }, 0), 0);

  console.log(numOccupied);
});

function applyRules(seats) {

  const changedSeats = seats.reduce((acc, row, row_idx) => {
    for (const [col_idx, seat] of row.entries()) {
      if (seat === EMPTY &&
          visibleOccupied(seats, row_idx, col_idx) === 0) {
        acc.push([row_idx, col_idx]);
      } else if (seat === OCCUPIED &&
                 visibleOccupied(seats, row_idx, col_idx) >= 5) {
        acc.push([row_idx, col_idx]);
      }
    }

    return acc;
  }, []);

  if (changedSeats.length === 0) {
    return seats;
  }

  for (const [row_idx, col_idx] of changedSeats) {
    if (seats[row_idx][col_idx] === EMPTY) {
      seats[row_idx][col_idx] = OCCUPIED;
    } else {
      seats[row_idx][col_idx] = EMPTY;
    }
  }

  return applyRules(seats);
}

function visibleOccupied(seats, center_row, center_col) {
  let count = 0;
  const directions = [[0, -1], [-1, -1], [-1, 0], [-1,  1], 
                      [0,  1], [ 1,  1], [ 1, 0], [ 1, -1]]

  for (const [row_change, col_change] of directions) {
    let row = center_row + row_change;
    let col = center_col + col_change;
    while (row >= 0 && row < seats.length && 
           col >= 0 && col < seats[row].length) {
      
      if (seats[row][col] === OCCUPIED) {
        count += 1;
        break;
      } else if (seats[row][col] === EMPTY) {
        break;
      }

      row += row_change;
      col += col_change;
    }
  }

  return count;
}
