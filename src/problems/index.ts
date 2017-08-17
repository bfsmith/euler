import { p15 } from './p15';
import { p18 } from './p18';

interface Problems {
  [key: number]: () => void;
}

export const problems: Problems = {
  15: p15,
  18: p18
};
