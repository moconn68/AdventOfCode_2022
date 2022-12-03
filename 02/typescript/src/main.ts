import fs from "fs";
import readline from "readline";

const inputPath = "../input.txt";

function calcRoundScoreOne(
  theirMove: "A" | "B" | "C",
  myMove: "X" | "Y" | "Z"
): number {
  const myPower = myMove === "X" ? 1 : myMove === "Y" ? 2 : 3;

  let score = myPower;
  // Determine win/lose/tie
  if (myMove === "X") {
    if (theirMove === "C") {
      // win
      score += 6;
    } else if (theirMove === "A") {
      // tie
      score += 3;
    }
  } else if (myMove === "Y") {
    if (theirMove === "A") {
      // win
      score += 6;
    } else if (theirMove === "B") {
      // tie
      score += 3;
    }
  } else {
    if (theirMove === "B") {
      // win
      score += 6;
    } else if (theirMove === "C") {
      // tie
      score += 3;
    }
  }

  return score;
}

function calcRoundScoreTwo(
  theirMove: "A" | "B" | "C",
  outcome: "X" | "Y" | "Z"
): number {
  let score = outcome === "X" ? 0 : outcome === "Y" ? 3 : 6;

  if (theirMove === "A") {
    if (outcome === "X") {
      score += 3;
    } else if (outcome === "Y") {
      score += 1;
    } else {
      score += 2;
    }
  } else if (theirMove === "B") {
    if (outcome === "X") {
      score += 1;
    } else if (outcome === "Y") {
      score += 2;
    } else {
      score += 3;
    }
  } else {
    if (outcome === "X") {
      score += 2;
    } else if (outcome === "Y") {
      score += 3;
    } else {
      score += 1;
    }
  }

  return score;
}

async function processLineByLine(): Promise<[number, number]> {
  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let scoreOne = 0;
  let scoreTwo = 0;
  for await (const line of rl) {
    if (line.length === 0) {
      // whitespace
    } else {
      // line data
      /**
       * Column 1:
       *  A = Rock
       *  B = Paper
       *  C = Scissors
       * Column 2:
       *  X = Rock
       *  Y = Paper
       *  Z = Scissors
       */
      scoreOne += calcRoundScoreOne(
        line[0] as "A" | "B" | "C",
        line[2] as "X" | "Y" | "Z"
      );
      /**
       * Column 1:
       *  A = Rock
       *  B = Paper
       *  C = Scissors
       * Column 2:
       *  X = Lose
       *  Y = Tie
       *  Z = Win
       */
      scoreTwo += calcRoundScoreTwo(
        line[0] as "A" | "B" | "C",
        line[2] as "X" | "Y" | "Z"
      );
    }
  }

  return [scoreOne, scoreTwo];
}

async function main() {
  const [expectedScoreOne, expectedScoreTwo] = await processLineByLine();
  console.log(
    `Expected score one: ${expectedScoreOne}\nExpected score two: ${expectedScoreTwo}`
  );
  // Correct answer one: 9241; Correct answer two: 14610
}

main();
