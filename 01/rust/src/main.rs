use std::{
    fs::File,
    io::{self, BufRead},
    path::Path,
};

const INPUT_PATH: &str = "../input.txt";

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
fn main() {
    if let Ok(lines) = read_lines(INPUT_PATH) {
        let mut data: Vec<i32> = Vec::new();
        let mut curr: i32 = 0;
        for line in lines {
            if let Ok(ip) = line {
                if ip.len() == 0 {
                    // whitespace
                    data.push(curr);
                    curr = 0;
                } else {
                    // calorie value
                    curr += ip.parse::<i32>().unwrap();
                }
            }
        }
        data.sort();
        println!("Largest calorie value: {}", data[data.len() - 1]);
        // Correct answer: 75501
        let top_three_sum = data[data.len() - 1] + data[data.len() - 2] + data[data.len() - 3];
        println!("Sum or top 3 largest calorie values: {top_three_sum}");
        // Correct answer: 215594
    } else {
        println!("Error reading input file");
    }
}
