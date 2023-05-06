import { MOCK_CARD } from "../../tests/mockData";

export const encryptWithAES = jest.fn().mockReturnValue("encrypted_text");

export const decryptWithAES = jest
  .fn()
  .mockReturnValue(JSON.stringify(MOCK_CARD));
