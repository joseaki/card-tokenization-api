import * as Joi from "joi";
import { ILoginRequest } from "src/interface/commerce.types";

const schema = Joi.object<ILoginRequest>({
  username: Joi.string().empty().required().messages({
    "string.base": "usuario debe ser un texto",
    "string.empty": "usuario no debe estar vacío",
    "any.required": "usuario es requerido",
  }),
  password: Joi.string().empty().required().messages({
    "string.base": "contraseña debe ser un texto",
    "string.empty": "contraseña no debe estar vacío",
    "any.required": "contraseña es requerido",
  }),
});
export default schema;
