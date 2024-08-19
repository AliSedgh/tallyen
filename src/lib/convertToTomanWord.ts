import { numberToWords, removeCommas } from "@persian-tools/persian-tools";

const convertToToman = (price: string): string => {
  const numericValue = parseInt(removeCommas(price) || "0", 10);
  return (numericValue / 10).toFixed(0);
};

const convertNumberToWords = (price: string): string => {
  const numericValue = parseInt(removeCommas(price) || "0", 10);
  const toman = Math.floor(numericValue / 10);
  const rial = numericValue % 10;

  const convertToWords = (num: number): string => numberToWords(num) as string;
  if (!price) return "";

  if (toman > 0 && rial > 0) {
    return `${convertToWords(toman)} تومان و ${convertToWords(rial)} ریال`;
  }

  if (toman > 0) {
    return `${convertToWords(toman)} تومان`;
  }

  if (rial > 0) {
    return `${convertToWords(rial)} ریال`;
  }

  return "صفر";
};

export { convertToToman, convertNumberToWords };
