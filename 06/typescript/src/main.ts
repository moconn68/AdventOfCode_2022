import fs from "fs";

const inputPath = "../input.txt";

function processFile(bufSize: number): number {
  const DATA = fs.readFileSync(inputPath);
  let counter = 0;
  let buf: string[] = [];
  for (let iter of DATA) {
    let char = String.fromCharCode(iter);
    if (buf.length < bufSize) {
      buf.push(char);
    } else {
      let valid = true;
      buf.forEach((el, idx) => {
        let tmpBuf = buf.slice();
        tmpBuf.splice(idx, 1);
        if (tmpBuf.includes(el)) {
          valid = false;
        }
      });
      if (valid) {
        return counter;
      }
      buf.shift();
      buf.push(char);
    }
    counter++;
  }
  return counter;
}

function main() {
  // Part One
  const firstPos = processFile(4);
  console.log(`Answer one: ${firstPos}`);
  // Correct answer: 1287

  // Part Two
  const secondPos = processFile(14);
  console.log(`Answer two: ${secondPos}`);
  // Correct answer: 3716
}

main();
