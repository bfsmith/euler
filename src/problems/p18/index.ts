import * as R from 'ramda';
import * as fs from 'fs';
import * as path from 'path';

interface Node {
  value: number;
  parents?: Node[];
  children: Node[];
}

const toNumber = (n: string) => Number(n);
const parseFile = (file: string): number[][] => {
  return R.compose(
    R.map(
      R.compose(
        R.map(toNumber),
        R.split(' ')
      )
    ),
    R.split('\n'),
  )(fs.readFileSync(file).toString());
}

const highestSubtotal = (tree: number[][]): number => {
  if (!tree || tree.length == 0) {
    return 0;
  }
  const currentRow = R.head(tree);
  const maxOfRow = currentRow.reduce(R.max, 0) as number;
  return maxOfRow + highestSubtotal(R.tail(tree));
}

const highestSubtotal2 = R.memoize((index: number, tree: number[][]): number[] => {
  if (!tree || tree.length == 0) {
    return [];
  }
  const currentRow = R.head(tree);
  const tail = R.tail(tree);
  
  const currentValue = currentRow[index];
  const v1 = highestSubtotal2(index, tail);
  const v2 = highestSubtotal2(index + 1, tail);
  const s1 = R.sum(v1);
  const s2 = R.sum(v2);

  if (s1 > s2) {
    return [currentValue].concat(v1);
  } else {
    return [currentValue].concat(v2);
  }
});

export const p18 = () => {
  const numbers = parseFile(path.join(__dirname, 'pyramid.txt'));

  const trivialAnswer = highestSubtotal2(0, numbers, []);
  console.log(R.sum(trivialAnswer));
};