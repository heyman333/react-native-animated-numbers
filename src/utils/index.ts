export function toAbsoluteInteger(num: number): number {
  return Math.abs(Math.floor(num));
}

export function createNumberArrayWithComma(
  amount: number,
  showCurrencySymbol: boolean,
  currencyCode?: string
): (number | string)[] {
  const numberFormatOptions: Intl.NumberFormatOptions = {
    style: currencyCode && showCurrencySymbol ? 'currency' : 'decimal',
    currency: currencyCode || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const formattedAmount = new Intl.NumberFormat(
    'en-US',
    numberFormatOptions
  ).format(amount);

  const cleanedAmount = formattedAmount.replace(/\s/g, ' ');

  return Array.from(cleanedAmount, (char) => {
    const num = Number(char);
    return isNaN(num) ? char : num;
  });
}
