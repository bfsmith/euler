import { p15 } from './p15';
import { p18 } from './p18';
import { p19 } from './p19';

interface Problems {
  [key: number]: () => void;
}

export const problems: Problems = {
  15: p15,
  18: p18,
  19: p19,
};
