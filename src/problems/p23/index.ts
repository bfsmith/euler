import * as R from 'ramda';

import { flatten } from '../../util';

const compareNumbers = (a: number, b: number) => a - b;

const getDivisors = (n: number): number[] => {
  return R.compose(
    R.concat([1]),
    R.sort(compareNumbers),
    flatten,
    R.map((v: number) => [v, n / v]),
    R.filter((v: number) => n % v == 0))(R.range(2, Math.ceil(Math.sqrt(n))));
};

const isAbundant = (n: number): boolean => R.sum(getDivisors(n)) > n;

const findInvalidNumbers = (max: number): number[] => {
  const abundantNumbers: number[] = [];
  const isValid = isSumOfAbundantNumbers(abundantNumbers);
  const map: boolean[] = [false];
  const invalid: number[] = [];
  for(let n = 1; n <= max; n++) {
    const div = getDivisors(n);
    if (R.sum(div) > n) {
      abundantNumbers.push(n);
    }
    if (!isValid(n)) {
      invalid.push(n);
    }
  }
  return invalid;
}

const isSumOfAbundantNumbers = R.curry((abundantNums: number[], n: number): boolean => {
  if (n % 2000 === 0) {
    console.log(n);
  }
  const halfN = n/2;
  for (let i1 = 0; i1 < abundantNums.length; i1++) {
    const n1 = abundantNums[i1];
    if (n1 > halfN) {
      // All others are > n1 so there's no combo that could work
      return false;
    }
    const diff = n - n1;
    for (let i2 = i1; i2 < abundantNums.length; i2++) {
      const n2 = abundantNums[i2];
      if (n2 === diff) {
        // console.log(`${n} = ${n1} + ${n2}`);
        return true;
      }
      if (n2 > diff) {
        // All other numbers are > n2 so there's no combo that could work
        break;
      }
    }
  }
  return false;
});

// Returns 20161
const findHighestInvalidNumber = (abundantNumbers: number[]): number => {
  const valid = isSumOfAbundantNumbers(abundantNumbers);
  for (let i = 28123; i > 1; i--) {
    if (!valid(i)) {
      return i;
    }
  }
  return 1;
}

export const p23 = () => {
  console.log('Does not compute correct answer');
  console.log('This can take up to a minute to finish...');
  // for(let i = 0; i < 5; i++) {
  //   let s = '';
  //   for(let j = 0; j < 100; j++) {
  //     s += isAbundant(i*100 + j) ? '.' : ' ';
  //   }
  //   console.log(s);
  // }
  // 20161 is the last number that can't be made by adding two abundant numbers
  const highest = 20161+1;

  const nums = findInvalidNumbers(highest);

  // const abundantNumbers = R.range(0, highest).filter(isAbundant);
  // const valid = isSumOfAbundantNumbers(abundantNumbers);
  // // console.log(findHighestInvalidNumber(abundantNumbers));
  // const nums = R.range(1, highest).filter(R.compose(R.not, valid));
  console.log(nums.length, R.sum(nums));
};
