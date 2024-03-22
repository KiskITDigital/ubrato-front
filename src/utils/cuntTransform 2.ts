export const countTransform: (count: number) => string = (count: number) => {
  const lastDigits = count % 100;
  const lastDigit = count % 10;
  if (lastDigits <= 20) {
    if (lastDigits === 1) {
      return 'тендер';
    } else if (lastDigits > 1 && lastDigits < 5) {
      return 'тендера';
    } else {
      return 'тендеров';
    }
  } else {
    if (lastDigit === 1) {
      return 'тендер';
    } else if (lastDigit > 1 && lastDigit < 5) {
      return 'тендера';
    } else {
      return 'тендеров';
    }
  }
};
