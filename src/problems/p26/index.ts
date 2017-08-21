import * as R from 'ramda';
/*
  1 / 7 =>
           10 / 7 = 1 r 3
           30 / 7 = 4 r 2
           20 / 7 = 2 r 6
           60 / 7 = 8 r 4
           40 / 7 = 5 r 5
           50 / 7 = 7 r 1 -- Repeats back at start

           .(142857)
*/

interface IQuotient {
  divisor: number;
  remainder: number;
}

interface IRemainderCache {
  [key: number]: number;
}

const getQuotient = (num: number, den: number): IQuotient => ({
  divisor: Math.floor(num / den),
  remainder: (num % den),
});

// Manually divide since we need complete precision for long decimals
function divide(num: number, den: number, ttl: number = den): IQuotient[] {
  const quotients: IQuotient[] = [];
  const cache: IRemainderCache = {}; // cache[remainder] = index_first_seen

  for (let n = 0; n < den; n++) {
    const q = getQuotient(num, den);
    quotients.push(q);
    if (cache[q.remainder] != undefined) {
      break;
    }
    if (q.remainder == 0 || ttl <= 0) {
      break;
    }
    cache[q.remainder] = n;
    num = q.remainder * 10;
  }
  return quotients;
}

const findRepeatingDecimals = (quotients: IQuotient[]): string => {
  const last = R.last(quotients);
  // Evenly divided, no repeating
  if (last.remainder == 0) {
    return '';
  }
  const firstIndex = quotients.findIndex(q => q.remainder == last.remainder);
  if (firstIndex == quotients.length - 1) {
    return '';
  }
  return quotients.slice(firstIndex, quotients.length - 1).map(q => q.divisor).join('');
}

export const p26 = () => {
  const answer = R.range(2, 1000)
    .map(d => ({
      d,
      repeat: findRepeatingDecimals(divide(10, d)),
    }))
    .reduce((max, next) => {
      return max.repeat.length > next.repeat.length
        ? max
        : next;
    }, { d: 0, repeat: '' });
  console.log(answer.d, answer.repeat);
}
