export function getRandomInteger(min: number, max: number): string {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return result.toString();
}
