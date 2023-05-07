import { MOCK_CARD } from "../../../tests/mockData";
import { insertCreditCard } from "../handler";
import * as cardRepository from "@database/redis/repository/card.repository";

jest.mock("@database/redis/repository/card.repository");
jest.mock("@libs/encrypt");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const card = {
    card_number: 371212121212122,
    cvv: 1243,
    expiration_month: "1",
    expiration_year: "2028",
    email: "jose@mail.com",
  };
  const headers = {
    authorization: "pk_test_xyzxyzxyzxyzxyzx",
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should create a token correctly", async () => {
    jest
      .spyOn(cardRepository, "getCreditCard")
      .mockResolvedValueOnce(undefined);
    const data = await insertCreditCard(card, headers);
    expect(data).toEqual({ token: expect.any(String) });
    expect(data.token.length).toEqual(16);
    expect(cardRepository.getCreditCard).toHaveBeenCalledTimes(1);
    expect(cardRepository.saveCreditCard).toHaveBeenCalledTimes(1);
  });

  test("should create a token correctly if it couldn't generate a random UUID once", async () => {
    jest
      .spyOn(cardRepository, "getCreditCard")
      .mockResolvedValueOnce(JSON.stringify(MOCK_CARD))
      .mockResolvedValueOnce(undefined);
    const data = await insertCreditCard(card, headers);
    expect(data).toEqual({ token: expect.any(String) });
    expect(data.token.length).toEqual(16);
    expect(cardRepository.getCreditCard).toHaveBeenCalledTimes(2);
    expect(cardRepository.saveCreditCard).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if it couldn't generate a random UUID", async () => {
    jest
      .spyOn(cardRepository, "getCreditCard")
      .mockRejectedValue(new Error("error"));
    expect(insertCreditCard(card, headers)).rejects.toThrow();
  });
});
