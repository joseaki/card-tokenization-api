import { CC, checkLUHN, getCreditCardType } from "@libs/creditCardValidation";

describe("credit card validation", () => {
  it("should get the card type", () => {
    expect(getCreditCardType("4111111111111111")).toEqual(CC.VISA);
    expect(getCreditCardType("5111111111111118")).toEqual(CC.MASTERCARD);
    expect(getCreditCardType("371212121212122")).toEqual(CC.AMEX);
    expect(getCreditCardType("36001212121210")).toEqual(CC.DINERS);
  });

  it("should check if the card number is valid", () => {
    expect(checkLUHN(4111111111111111)).toEqual(true);
    expect(checkLUHN(5111111111111118)).toEqual(true);
    expect(checkLUHN(371212121212122)).toEqual(true);
    expect(checkLUHN(36001212121210)).toEqual(true);
    expect(checkLUHN(4111111111111112)).toEqual(false);
    expect(checkLUHN(5111111111111117)).toEqual(false);
    expect(checkLUHN(371212121212123)).toEqual(false);
    expect(checkLUHN(36001212121211)).toEqual(false);
  });
});
