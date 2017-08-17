// Make my own flatten because Ramda's type definitions cause the Typescript compiler to fail
export const flatten = <T>(arrayOfArrays: T[][]): T[] => {
  const flat: T[] = [];
  arrayOfArrays.forEach(a => flat.push(...a));
  return flat;
}
