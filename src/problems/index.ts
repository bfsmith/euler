import { p15 } from './p15';
import { p18 } from './p18';
import { p19 } from './p19';
import { p20 } from './p20';
import { p23 } from './p23';
import { p24 } from './p24';
import { p25 } from './p25';
import { p26 } from './p26';

interface Problems {
  [key: number]: () => void;
}

export const problems: Problems = {
  15: p15,
  18: p18,
  19: p19,
  20: p20,
  23: p23,
  24: p24,
  25: p25,
  26: p26,
};
