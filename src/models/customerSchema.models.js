import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const customerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(10).max(11).required(),
  cpf: Joi.string().length(11).required(),
  birthday: Joi.date().format("YYYY-MM-DD").required(),
});
