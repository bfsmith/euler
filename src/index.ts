import * as R from 'ramda';

import { problems } from './problems';

const problemNumber = () => {
  try {
    // R.compose(R.head, R.tail, R.tail)(process.argv) is giving a compile error...
    return Number(R.head(R.tail(R.tail(process.argv))) || process.env.CURRENT_PROBLEM);
  } catch (error) {
    return undefined;
  }
}

const main = () => {
  const problem = problemNumber();
  if (!problem) {
    console.log('Set CURRENT_PROBLEM to a number or pass the problem to execute as a command line param.');
    process.exit(0);
    return;
  }

  const fn = problems[problem];
  if (fn) {
    fn();
  } else {
    console.error(`Problem ${problem} not found.`);
  }
}

main();
