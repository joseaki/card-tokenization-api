import { getCardInfo } from "../handler";
import * as cardRepository from "@database/redis/repository/card.repository";

jest.mock("@database/redis/repository/card.repository");
jest.mock("@libs/encrypt");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const params = {
    cardToken: "some_token",
  };
  const headers = {
    Authorization: "pk_test_xyzxyzxyzxyzxyzx",
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should create a token correctly", async () => {
    const data = await getCardInfo(params, headers);
    expect(data).toEqual(
      expect.objectContaining({
        card_number: expect.any(Number),
        expiration_month: expect.any(String),
        expiration_year: expect.any(String),
      })
    );
    expect(cardRepository.getCreditCard).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if there is no card stored", async () => {
    jest
      .spyOn(cardRepository, "getCreditCard")
      .mockResolvedValueOnce(undefined);
    expect(getCardInfo(params, headers)).rejects.toThrow();
  });

  test("should throw an error if retrieving a card fails", async () => {
    jest
      .spyOn(cardRepository, "getCreditCard")
      .mockRejectedValueOnce(new Error("error"));
    expect(getCardInfo(params, headers)).rejects.toThrow();
  });
});
