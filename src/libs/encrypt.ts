import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { readFileSync } from "fs";

const privateKey = readFileSync(`${__dirname}/../../../tokenization`, {
  encoding: "utf8",
  flag: "r",
});

export const encryptWithAES = (
  text: string,
  passphrase = privateKey
): string => {
  return AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (
  ciphertext: string,
  passphrase = privateKey
): string => {
  const bytes = AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(Utf8);
  return originalText;
};
