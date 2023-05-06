export enum CC {
  VISA = "VISA",
  AMEX = "AMEX",
  MASTERCARD = "MASTERCARD",
  DISCOVER = "DISCOVER",
  DINERS = "DINERS",
}

export const getCreditCardType = (creditCard: string) => {
  const visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  const amex = new RegExp("^3[47][0-9]{13}$");
  const diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
  const mastercard = new RegExp("^5[1-5][0-9]{14}$");
  const mastercard2 = new RegExp("^2[2-7][0-9]{14}$");
  const discovery1 = new RegExp("^6011[0-9]{12}[0-9]*$");
  const discovery2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
  const discovery3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

  if (visa.test(creditCard)) {
    return CC.VISA;
  }
  if (amex.test(creditCard)) {
    return CC.AMEX;
  }
  if (diners.test(creditCard)) {
    return CC.DINERS;
  }
  if (mastercard.test(creditCard) || mastercard2.test(creditCard)) {
    return CC.MASTERCARD;
  }
  if (
    discovery1.test(creditCard) ||
    discovery2.test(creditCard) ||
    discovery3.test(creditCard)
  ) {
    return CC.DISCOVER;
  }

  return undefined;
};

export const checkLUHN = (card: number) => {
  const cardNumber = card.toString();
  let numberDigits = cardNumber.length;
  let sum = 0;
  let isSecond = false;
  for (let i = numberDigits - 1; i >= 0; i--) {
    let double = cardNumber[i].charCodeAt(0) - "0".charCodeAt(0);
    if (isSecond == true) {
      double = double * 2;
    }
    sum += Math.trunc(double / 10);
    sum += double % 10;

    isSecond = !isSecond;
  }
  return sum % 10 == 0;
};
