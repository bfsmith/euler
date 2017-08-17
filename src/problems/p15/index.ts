import * as R from 'ramda';

/*
  1x1
  +---+   0---1
  |   | = |   |
  +---+   1---2

  2x2
  +---+---+   0---1---1
  |   |   | = |   |   |
  +---+---+   1---2---3
  |   |   |   |   |   |
  +---+---+   1---3---6

  3x3
  +---+---+---+   0---1---1---1
  |   |   |   | = |   |   |   |
  +---+---+---+   1---2---3---4
  |   |   |   |   |   |   |   |
  +---+---+---+   1---3---6---10
  |   |   |   |   |   |   |   |
  +---+---+---+   1---4---10--20
*/

// The function is pure so we can speed up repeated calls with memoization
const pathMatrix = R.memoize((d: number): number[][] => {
  if (d == 0) {
     // We don't actually every use the 0,0 value so we could start with an 
     //   empty 2D array but it looks better with the 0 there.
    return [[0]];
  }
  // Recurse to build the sub matrix
  const array = pathMatrix(d-1);
  array[0][d] = 1; // Add new column at end of row
  array.push([1]); // Add new row at bottom
  R.range(1, d+1).forEach(r => {
    array[r][d] = array[r-1][d] + array[r][d-1]; // populate the right column
    array[d][r] = array[d][r-1] + array[d-1][r]; // populate the bottom row
  });
  return array;
});

export const p15 = () => {
  const array = pathMatrix(20);
  console.log(array[20][20]);
};