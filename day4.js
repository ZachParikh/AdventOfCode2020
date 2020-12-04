const fs = require("fs");

fs.readFile("inputs/input4.txt", "utf8", (err, data) => {
  const passports = 
    data.split("\n\n")
        .map(passport => 
          passport.split(/[\n ]/).map(field => field.split(":")))
        .map(passport => Object.fromEntries(passport));

  const numValid = passports.reduce((acc, passport) => {
    if (validPassport(passport)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
    
  console.log(numValid);
});

function validPassport(passport) {
  const validityFunctions = [
    hasRequiredFields, 
    validBirthYear,
    validIssueYear,
    validExpiration,
    validHeight,
    validHairColor,
    validEyeColor,
    validPID
  ];

  return validityFunctions.every(f => f(passport));
}

function hasRequiredFields(passport) {
  const requiredFields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"];
  return requiredFields.every(field => field in passport);
}

function validBirthYear(passport) {
  const min = 1920;
  const max = 2002;
  const digits = 4;

  return validNumber(digits, min, max, passport["byr"]);
}

function validIssueYear(passport) {
  const min = 2010;
  const max = 2020;
  const digits = 4;

  return validNumber(digits, min, max, passport["iyr"]);
}

function validExpiration(passport) {
  const min = 2020;
  const max = 2030;
  const digits = 4;

  return validNumber(digits, min, max, passport["eyr"]);
}

function validHeight(passport) {
  const height_re = /^(\d+)((in)|(cm))$/
  const height = passport["hgt"];
  const groups = height.match(height_re);
  
  if (!groups) {
    return false;
  }

  const n = groups[1];
  const type = groups[2];

  if (type === "cm") {
    return n >= 150 && n <=193;
  } else if (type === "in") {
    return n >= 59 && n <= 76;
  }

  return false;
}

function validHairColor(passport) {
  return /^#[0-9a-f]{6}$/.test(passport["hcl"]);
}

function validEyeColor(passport) {
  const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return colors.includes(passport["ecl"]);
}

function validPID(passport) {
  return /^[0-9]{9}$/.test(passport["pid"]);
}

function validNumber(digits, min, max, s) {
  if (s.length !== digits) {
    return false;
  }

  const n = Number(s);

  if (n === NaN || n < min || n > max) {
    return false;
  }

  return true;
}

