import * as Joi from "joi";
import { ILoginRequest } from "src/interface/commerce.types";

const schema = Joi.object<ILoginRequest>({
  username: Joi.string().empty().required().messages({
    "string.base": "username should be a string",
    "string.empty": "username should not be empty",
    "any.required": "username is required",
  }),
  password: Joi.string().empty().required().messages({
    "string.base": "password should be a string",
    "string.empty": "password should not be empty",
    "any.required": "password is required",
  }),
});
export default schema;
