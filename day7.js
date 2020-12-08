const fs = require("fs");

class Bag {
  constructor(name, contents) {
    this.name = name;
    this.contents = contents;
  }
}

fs.readFile("inputs/input7.txt", "utf8", (err, data) => {
  const bags = data.split("\n").map(bag => {
    let [name, contents] = bag.split(" bags contain ", 2);
    
    contents = contents.split(",").reduce((contents, content) => {
      const groups = content.match(/(\d*) ([a-z\s]+) bag/);

      const quantity = groups[1];
      const name = groups[2];

      if (quantity === "") {
        return contents;
      }

      return contents.set(name, quantity);
    }, new Map());
    return new Bag(name, contents);
  });

  const validBags = findBagsToCarry(bags, new Set(['shiny gold']));
  console.log(validBags.size - 1);
});

function findBagsToCarry(bags, inner_bags) {
  const outer_bags = bags.filter(bag => 
    Array.from(bag.contents.keys()).some(content => inner_bags.has(content)))
    .map(bag => bag.name);
    
  const new_bags = new Set(inner_bags);
  for (const bag of outer_bags) {
    new_bags.add(bag);
  }

  if (new_bags.size === inner_bags.size) {
    return inner_bags;
  }

  return findBagsToCarry(bags, new_bags);
}