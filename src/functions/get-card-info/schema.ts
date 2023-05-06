import * as Joi from "joi";

const schema = Joi.object({
  cardToken: Joi.string().alphanum().length(16),
});
export default schema;
