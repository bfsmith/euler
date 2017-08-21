import * as R from 'ramda';

// All functions are pure

// Each swap of an index (i) represents (length-i)! permutations
const compareNumbers = (a: number, b: number) => a - b;

const factorial = R.memoize((n: number): number => {
  if (n <= 1) { return 1; }
  return n * factorial(n - 1);
});

// Select index that reaches the desired number of permutations
const digitsToManipulateToReachIteration = (permutations: number): number => {
  return R.head(R.range(1, 50).filter(n => factorial(n) > permutations));
}

/*
  
  Calculates the number of digits that need to be moved to reach the given permutations
  Keeps all digits as is until that index
  Calculates the permutations for each most significant number swap (n!)
  Take the floor of the permutations per swap with total permutations needed -> index to select next
  Diff the total permutations with the amount we exhausted with the select and recurse
*/
const calculatePermutation = (permutation: number, digits: number[]): number[] => {
  if (permutation <= 0) {
    return digits;
  }
  // Copy so we don't mess with the original
  const mutDigits = [...digits];
  const digitsToPermute = digitsToManipulateToReachIteration(permutation);
  const digitsToKeep = mutDigits.splice(0, mutDigits.length - digitsToPermute);
  
  const permutationsPerMostSignificantDigitSwap = factorial(digitsToPermute - 1); // - 1 since it gives us the first number > permutations but we want last under
  const swaps = Math.floor(permutation / permutationsPerMostSignificantDigitSwap);
  const digitToSelect = mutDigits.splice(swaps, 1);

  return digitsToKeep.concat(digitToSelect).concat(calculatePermutation(
    permutation - permutationsPerMostSignificantDigitSwap * swaps, mutDigits));
}

export const p24 = () => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(compareNumbers);
  let permutation = 1000000;
  const answer = calculatePermutation(permutation-1, digits); // - 1 to convert to index
  console.log(answer.join(''));
}
