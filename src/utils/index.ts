export function toAbsoluteInteger(num: number) {
  return Math.abs(Math.floor(num));
}

export function createNumberArrayWithComma(
  numberString: string,
  locale: Intl.LocalesArgument = 'en-US'
): (number | ',')[] {
  // Convert the string to a number and use Intl.NumberFormat to format it
  const formattedString = new Intl.NumberFormat(locale).format(
    Number(numberString)
  );

  // Split the formatted string into an array of numbers and commas
  const arr = Array.from(formattedString, (char) =>
    char === ',' ? char : Number(char)
  );

  return arr;
}
