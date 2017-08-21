import * as R from 'ramda';

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
      carryOver[i + 1] = '1';
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

const fib = R.memoize((n: number): string => {
  if (n <= 2) { return '1'; }
  const n1 = fib(n - 1);
  const n2 = fib(n - 2);
  return strAdd(n1, n2);
});

export const p25 = () => {
  // R.range(1, 20).forEach(n => console.log(n, fib(n)));
  console.log(
    R.last(R.takeWhile<number>(n => fib(n).length < 1000,
    R.range(0, 10000))) + 1); // + 1 since we took the last one before 1000
  //   console.log(fib(4781));
}