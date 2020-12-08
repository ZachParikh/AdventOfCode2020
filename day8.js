const fs = require('fs');

fs.readFile("inputs/input8.txt", 'utf8', (err, data) => {
  const instructions = 
    data.split("\n")
        .map(instruction => [instruction.split(" "), false]);

  const jumps_nops = Array.from(instructions.entries())
    .filter(([_, instruction]) => {
      const op = instruction[0][0];
      return op === "jmp" || op === "nop";
    })
    .map(([i, _]) => i);

  const acc = executeInstructions(instructions, jumps_nops);
  console.log(acc);
})

function executeInstructions(instructions, jumps_nops) {
  let acc = 0;
  
  for (const change_idx of jumps_nops) {
    let i = 0;
    acc = 0;
    let stop = false;

    while (!stop) {
      [acc, i, stop, loop] = 
        executeInstruction(instructions, acc, i, change_idx);
    }

    if (!loop) {
      return acc;
    }

    instructions = instructions.map(([instruction, _]) => [instruction, false]);
  }

  return acc;
}

function executeInstruction(instructions, acc, i, change_idx) {

  if (i >= instructions.length) {
    return [acc, i, true, false];
  }
  
  const [instruction, executed] = instructions[i];
  if (executed) {
    return [acc, i, true, true];
  }
  
  instructions[i] = [instruction, true];
  
  const [op, arg] = instruction;
  switch (op) {
    case "acc":
      return [acc + Number(arg), i + 1, false, true];
    case "jmp":
      if (i === change_idx) {
        return [acc, i + 1, false, true];
      } else {
        return [acc, i + Number(arg), false, true];
      }
    case "nop":
      if (i === change_idx) {
        return [acc, i + Number(arg), false, true];
      } else {
        return [acc, i + 1, false, true];
      }
    default:
      return [acc, i, true, true];
  }

}