use std::{
    fs::File,
    io::{self, BufRead},
    path::Path,
};

const INPUT_PATH: &str = "../input.txt";

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
// Borrowed from https://doc.rust-lang.org/rust-by-example/std_misc/file/read_lines.html
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

fn calc_score_one(their_move: char, my_move: char) -> i32 {
    let my_power = if my_move == 'X' {
        1
    } else if my_move == 'Y' {
        2
    } else {
        3
    };

    let mut score = my_power;
    // Determine win/lose/tie
    if my_move == 'X' {
        if their_move == 'C' {
            // win
            score += 6;
        } else if their_move == 'A' {
            // tie
            score += 3;
        }
    } else if my_move == 'Y' {
        if their_move == 'A' {
            // win
            score += 6;
        } else if their_move == 'B' {
            // tie
            score += 3;
        }
    } else {
        if their_move == 'B' {
            // win
            score += 6;
        } else if their_move == 'C' {
            // tie
            score += 3;
        }
    }

    return score;
}

fn calc_score_two(their_move: char, outcome: char) -> i32 {
    let mut score = if outcome == 'X' {
        0
    } else if outcome == 'Y' {
        3
    } else {
        6
    };

    if their_move == 'A' {
        if outcome == 'X' {
            score += 3;
        } else if outcome == 'Y' {
            score += 1;
        } else {
            score += 2;
        }
    } else if their_move == 'B' {
        if outcome == 'X' {
            score += 1;
        } else if outcome == 'Y' {
            score += 2;
        } else {
            score += 3;
        }
    } else {
        if outcome == 'X' {
            score += 2;
        } else if outcome == 'Y' {
            score += 3;
        } else {
            score += 1;
        }
    }

    return score;
}
fn main() {
    if let Ok(lines) = read_lines(INPUT_PATH) {
        let mut first_score = 0;
        let mut second_score = 0;
        for line in lines {
            if let Ok(ip) = line {
                if ip.len() == 0 {
                    // whitespace
                } else {
                    // line data
                    let first_char = ip.chars().next().unwrap();
                    let second_char = ip.chars().nth(2).unwrap();
                    first_score += calc_score_one(first_char, second_char);
                    second_score += calc_score_two(first_char, second_char);
                }
            }
        }
        println!("First score: {}", first_score);
        // Correct score: 9241
        println!("Second score: {}", second_score);
        // Correct score: 14610
    } else {
        println!("Error reading input file");
    }
}
