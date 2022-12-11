import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const customerSchema = Joi.object({
  name: Joi.string().min(3).required().trim(),
  phone: Joi.string()
    .min(10)
    .max(11)
    .required()
    .pattern(/^[0-9]+$/)
    .trim(),
  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .trim(),
  birthday: Joi.date().format("YYYY-MM-DD").greater("1900-01-01").required(),
});
