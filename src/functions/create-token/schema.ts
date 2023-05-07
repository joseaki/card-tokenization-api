import * as Joi from "joi";
import { CC, checkLUHN, getCreditCardType } from "@libs/creditCardValidation";
import { ITokenizeRequest } from "src/interface/tokenize.types";

const cardJoi = Joi.extend((joi) => ({
  type: "number",
  base: joi.number(),
  messages: {
    "number.creditCart": "Número de tarjeta inválida",
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
    "number.base": "CVV debe ser un número",
    "number.empty": "CVV no debe estar vacío",
    "any.required": "CVV es requerido",
  }),
  expiration_month: Joi.number().min(1).max(12).required().messages({
    "number.base": "El mes debe ser un número válido",
    "number.empty": "El mes no debe estar vacío",
    "number.min": "El mes debe ser mayor o igual a cero",
    "number.max": "El mes debe ser menor o igual a 12",
    "any.required": "El mes es requerido",
  }),
  expiration_year: Joi.number()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 5)
    .required()
    .messages({
      "number.base": "El año debe ser un número válido",
      "number.empty": "El año no debe estar vacío",
      "number.min": "El año debe ser mayor o igual a {{#limit}}",
      "number.max": "El año debe ser menor o igual a  {{#limit}}",
      "any.required": "El ano es requerido",
    }),
  email: Joi.string().email().required(),
}).custom((obj, helpers) => {
  if (
    obj.expiration_year < new Date().getFullYear() ||
    (obj.expiration_year === new Date().getFullYear() &&
      obj.expiration_month < new Date().getMonth() + 1)
  ) {
    return helpers.message({ custom: `La tarjeta ya expiró` });
  }

  const cvv = obj.cvv.toString();
  const ccType = getCreditCardType(obj.card_number);
  if (ccType === CC.AMEX && cvv.length === 4) {
    return obj;
  } else if (ccType !== CC.AMEX && cvv.length === 3) {
    return obj;
  } else if (!ccType || cvv) {
    return helpers.message({ custom: `CVV inválido` });
  }
});
export default schema;
