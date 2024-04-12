export function toAbsoluteInteger(num: number) {
  return Math.abs(Math.floor(num));
}

export function createNumberArrayWithComma(numberString: string): number[] {
  const arr = Array.from(numberString, Number);

  const reducedArray = new Array(Math.ceil(numberString.length / 3)).fill(0);

  reducedArray.forEach((_, index) => {
    if (index !== 0) {
      //@ts-ignore splice(start: number, deleteCount: number, ...items: T[]): T[];
      arr.splice(numberString.length - index * 3, 0, ',');
    }
  });

  return arr;
}
