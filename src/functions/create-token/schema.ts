import * as Joi from "joi";
import { CC, checkLUHN, getCreditCardType } from "@libs/creditCardValidation";
import { ITokenizeRequest } from "src/interface/tokenize.types";

const cardJoi = Joi.extend((joi) => ({
  type: "number",
  base: joi.number(),
  messages: {
    "number.creditCart": "{{#label}} must be a valid credit card number",
  },
  rules: {
    creditCart: {
      validate(value, helpers) {
        if (!checkLUHN(value)) {
          return helpers.error("number.creditCart", { value });
        }

        return value;
      },
    },
  },
}));

const schema = Joi.object<ITokenizeRequest>({
  card_number: cardJoi.number().creditCart().required().strict(),
  cvv: Joi.number().required().strict().messages({
    "number.base": "cvv should be a number",
    "number.empty": "cvv should not be empty",
    "any.required": "cvv number is required",
  }),
  expiration_month: Joi.number().min(1).max(12).required().messages({
    "number.base": "expiration_month should be a number",
    "number.empty": "expiration_month should not be empty",
    "number.min": "expiration_month must be more or equal than zero",
    "number.max": "expiration_month must be less than or equal to 12",
    "any.required": "expiration_month is required",
  }),
  expiration_year: Joi.number()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 5)
    .required()
    .messages({
      "number.base": "expiration_year should be a number",
      "number.empty": "expiration_year should not be empty",
      "number.min": "expiration_year must be more or equal than {{#limit}}",
      "number.max": "expiration_year must be less than or equal to {{#limit}}",
      "any.required": "expiration_year is required",
    }),
  email: Joi.string().email().required(),
}).custom((obj, helpers) => {
  if (
    obj.expiration_year < new Date().getFullYear() ||
    (obj.expiration_year === new Date().getFullYear() &&
      obj.expiration_month < new Date().getMonth() + 1)
  ) {
    return helpers.message({ custom: `credit card expired` });
  }

  const cvv = obj.cvv.toString();
  const ccType = getCreditCardType(obj.card_number);
  if (ccType === CC.AMEX && cvv.length === 4) {
    return obj;
  } else if (ccType !== CC.AMEX && cvv.length === 3) {
    return obj;
  } else if (!ccType || cvv) {
    return helpers.message({ custom: `invalid cvv number` });
  }
});
export default schema;
