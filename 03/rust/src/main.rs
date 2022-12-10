use std::{
    fs::File,
    io::{self, BufRead},
    path::Path,
};

const INPUT_PATH: &str = "../input.txt";

const ALPHA: &str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

fn p1() -> i32 {
    if let Ok(lines) = read_lines(INPUT_PATH) {
        let mut sum = 0;
        for line in lines {
            // Split word into two evenly
            let word = line.unwrap();
            let midpoint = word.chars().count() / 2;
            let w1 = &word[..midpoint];
            let w2 = &word[midpoint..word.chars().count()];

            // Find common letter
            for char in w1.chars() {
                if w2.contains(char) {
                    // Compute priority and add to sum
                    let priority = ALPHA.find(char).unwrap() + 1;
                    sum += priority;
                    break;
                }
            }
        }
        return sum as i32;
    } else {
        println!("Error reading input file.");
        return -1;
    }
}

// fn p2() -> i32 {
//     if let Ok(lines) = read_lines(INPUT_PATH) {
//         for line in lines {
//             println!("{}", line.unwrap());
//         }
//         return 0;
//     } else {
//         println!("Error reading input file.");
//         return -1;
//     }
// }
fn main() {
    let ans1 = p1();
    println!("First sum: {}", ans1);
    // Correct sum: 8202

    // let ans2 = p2();
    // println!("Second sum: {}", ans2);
    // Correct sum: 2864
}
