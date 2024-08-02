function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Time Complexity: O(n) - The function iterates through all numbers from 1 to n.
// Space Complexity: O(1) - The space used does not depend on the input size.

function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

// Time Complexity: O(1) - The computation is done in constant time using a mathematical formula.
// Space Complexity: O(1) - Only a few variables are used, regardless of the input size.

function sum_to_n_c(n: number): number {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, cur) => acc + cur, 0);
}

// Time Complexity: O(n) - The function calls itself n times.
// Space Complexity: O(n) - Due to the recursive call stack, which grows linearly with n.

const randomNumber = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
console.log("Number test is: ", randomNumber);
sum_to_n_a(randomNumber);
sum_to_n_b(randomNumber);
sum_to_n_c(randomNumber);
