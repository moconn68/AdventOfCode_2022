import fs from "fs";
import readline from "readline";

const inputPath = "../input.txt";

async function processLineByLineOne(): Promise<number[]> {
  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let containsCount = 0;
  let overlapsCount = 0;
  for await (const line of rl) {
    if (line.length === 0) {
      // whitespace
    } else {
      // line data
      const [interval1, interval2] = line.split(",");
      console.log(`interval1: ${interval1}, interval2: ${interval2}`);
      const range1 = [
        Number.parseInt(interval1.split("-")[0]),
        Number.parseInt(interval1.split("-")[1]),
      ];
      const range2 = [
        Number.parseInt(interval2.split("-")[0]),
        Number.parseInt(interval2.split("-")[1]),
      ];
      console.log(`range1: ${range1}, range2: ${range2}`);
      if (range1[0] >= range2[0] && range1[1] <= range2[1]) {
        console.log(
          `interval1 (${interval1}) is contained within interval2 (${interval2})`
        );
        containsCount++;
        overlapsCount++;
      } else if (range2[0] >= range1[0] && range2[1] <= range1[1]) {
        console.log(
          `interval2 (${interval2}) is contained within interval1 (${interval1})`
        );
        containsCount++;
        overlapsCount++;
      } else if (
        (range1[0] <= range2[0] && range1[1] >= range2[0]) ||
        (range1[0] <= range2[1] && range1[1] >= range2[1])
      ) {
        console.log("overlap hit");
        overlapsCount++;
      }
      console.log("\n");
    }
  }
  return [containsCount, overlapsCount];
}

async function main() {
  // Part One
  const [containsSum, overlapsSum] = await processLineByLineOne();
  console.log(`Answer one: ${containsSum}`);
  // Correct answer one: 518
  console.log(`Answer two: ${overlapsSum}`);
  // Correct answer: 909
}

main();
