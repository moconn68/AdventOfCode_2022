import fs from "fs";
import readline from "readline";

const inputPath = "../input.txt";

async function processLineByLine(): Promise<number[]> {
  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let data: number[] = [];
  let curr = 0;
  for await (const line of rl) {
    if (line.length === 0) {
      // whitespace
      data.push(curr);
      curr = 0;
    } else {
      curr += Number.parseInt(line);
    }
  }
  return data.sort((a, b) => a - b);
}

async function main() {
  const sortedData = await processLineByLine();
  console.log(`Max solo calories: ${sortedData[sortedData.length - 1]}`);
  // Correct answer: 75501
  const topThreeSum =
    sortedData[sortedData.length - 1] +
    sortedData[sortedData.length - 2] +
    sortedData[sortedData.length - 3];
  console.log(`Sum of top 3 most calories: ${topThreeSum}`);
  // Correct answer: 215594
}

main();
