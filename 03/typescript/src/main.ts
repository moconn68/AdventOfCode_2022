import fs from "fs";
import readline from "readline";

const inputPath = "../input.txt";

const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

async function processLineByLineOne(): Promise<number> {
  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let prioritySum = 0;
  for await (const line of rl) {
    if (line.length === 0) {
      // whitespace
    } else {
      // line data
      let firstChars = line.split("");
      let secondChars = firstChars.splice(Math.round(firstChars.length / 2));
      for (let char of firstChars) {
        if (secondChars.find((c) => c === char) !== undefined) {
          prioritySum += ALPHA.findIndex((c) => c === char) + 1;
          break;
        }
      }
    }
  }
  return prioritySum;
}

async function processLineByLineTwo(): Promise<number> {
  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let group: Array<Set<string>> = [];
  let totalSum = 0;
  for await (const line of rl) {
    if (line.length === 0) {
      // whitespace
    } else {
      // line data
      group.push(new Set(line.split("")));
      if (group.length === 3) {
        // TODO logic
        for (let char of group[0]) {
          if (group[1].has(char) && group[2].has(char)) {
            const priority = ALPHA.findIndex((c) => c === char) + 1;
            totalSum += priority;
            break;
          }
        }
        // reset
        group = [];
      }
    }
  }
  return totalSum;
}

async function main() {
  // Part One
  const prioritySum = await processLineByLineOne();
  console.log(`Sum: ${prioritySum}`);
  // Correct answer one: 8202

  // Part Two
  const groupSum = await processLineByLineTwo();
  console.log(`Group sum: ${groupSum}`);
  // Correct answer two: 2864
}

main();
