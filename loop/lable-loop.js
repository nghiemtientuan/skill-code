// Do not use lable
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === j) {
            continue;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}
// Ouput 6 results
//  i = 0, j = 1
//  i = 0, j = 2
//  i = 1, j = 0
//  i = 1, j = 2
//  i = 2, j = 0
//  i = 2, j = 1

// Use label
/**
 * fisrtLoop is label for loop 1
 * if i = 0, j = 0 => break, continue loop1 (i = 0)
 * if i = 1, j = 0 => break, continue loop1 (i = 2)
 * The same goto loop1
*/
firstLoop: 
for (let i = 0; i < 3; i++) { 
    for (let j = 0; j < 3; j++) {
        if (i === j) {
            continue firstLoop; // break firstLoop;
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}
// Ouput 3 results 
// i = 1, j = 0
// i = 2, j = 0
// i = 2, j = 1
