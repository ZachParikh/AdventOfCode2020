const fs = require("fs");

class Content {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }
}

fs.readFile("inputs/input7.txt", "utf8", (err, data) => {
  const bags = data.split("\n").reduce((bags, bag) => {
    let [name, contents] = bag.split(" bags contain ", 2);
    
    contents = contents.split(",").map(content => {
      const groups = content.match(/(\d*) ([a-z\s]+) bag/);

      const quantity = groups[1];
      const name = groups[2];

      if (quantity === "") {
        return false;
      }

      return new Content(name, Number(quantity));
    }).filter(content => content);
    
    return bags.set(name, contents);
  }, new Map());

  const num_inner_bags = countInnerBags(bags, 'shiny gold');
  console.log(num_inner_bags - 1);
});

function countInnerBags(bags, name) {
  const contents = bags.get(name);

  return contents.reduce((count, content) => 
    count + content.quantity * countInnerBags(bags, content.name), 1);
}