import * as R from 'ramda';

const factorial = R.memoize((n: number): string => {
  if (n <= 1) { return '1'; }
  return strMult(factorial((n-1).toString()), n);
});

const leftPad = (s: string, n: number): string => {
  while (s.length < n) {
    s = "0" + s;
  }
  return s;
}

const strAdd = (num1: string, num2: string): string => {
  const maxLength = Math.max(num1.length, num2.length);
  const s1 = leftPad(num1, maxLength).split('').reverse();
  const s2 = leftPad(num2, maxLength).split('').reverse();
  let sum: string[] = R.repeat('0', maxLength);
  const carryOver: string[] = R.repeat('0', maxLength);
  s1.map((_, i) => {
    let add = Number(s1[i]) + Number(s2[i]);
    if (add >= 10) {
      carryOver[i+1] = '1';
      add -= 10;
    }
    sum[i] = add.toString();
  });
  let result = sum.reverse().join('');
  // If we have any carry over, add to the sum
  if (carryOver.some(v => v !== '0')) {
    result = strAdd(result, carryOver.reverse().join(''));
  }
  return result;
}

const strMult = (num: string, mult: number): string => {
  const digits = num.split('').map(Number).reverse();
  const padding = mult.toString().length;
  const multiParts = digits.map((d, i) => {
    return (d * mult).toString() + R.repeat('0', i).join('');
  });
  return multiParts.reduce((result, next) => strAdd(result, next), '');
}

export const p20 = () => {
  const f100 = factorial(100);
  console.log(f100.split('').map(Number).reduce(R.add, 0));
};