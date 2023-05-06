import { login } from "../handler";
import * as commerceRepository from "@database/mongo/repository/commerce.repository";

jest.mock("@database/mongo/repository/commerce.repository");
jest.mock("@libs/encrypt");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const body = {
    username: "commerce_a",
    password: "admin",
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should login correctly", async () => {
    const data = await login(body);
    expect(data).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
    expect(commerceRepository.getCommerceByUsername).toHaveBeenCalledTimes(1);
  });

  test("should throw an error if there is no commerce registered with credentials", async () => {
    jest
      .spyOn(commerceRepository, "getCommerceByUsername")
      .mockResolvedValueOnce(undefined);
    expect(login(body)).rejects.toThrow();
  });

  test("should throw an error if there is no commerce registered with credentials", async () => {
    jest
      .spyOn(commerceRepository, "getCommerceByUsername")
      .mockResolvedValueOnce(undefined);
    expect(login(body)).rejects.toThrow();
  });

  test("should throw an error if password doesn't match", async () => {
    jest
      .spyOn(commerceRepository, "getCommerceByUsername")
      .mockResolvedValueOnce(undefined);
    expect(login({ ...body, password: "incorrect" })).rejects.toThrow();
  });
});
