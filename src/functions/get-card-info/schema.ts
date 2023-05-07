import * as Joi from "joi";

const schema = Joi.object({
  cardToken: Joi.string().alphanum().length(16).required().messages({
    "string.base": "Token debe ser un texto",
    "string.empty": "Token no debe estar vacío",
    "string.length": "Token debe tener 16 caracteres",
    "any.required": "Token es requerido",
  }),
});
export default schema;
