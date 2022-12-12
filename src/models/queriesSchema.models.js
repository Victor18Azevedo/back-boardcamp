import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const queriesSchema = Joi.object({
  cpf: Joi.string().pattern(/^[0-9]+$/),
  name: Joi.string().alphanum().trim(),
  customerId: Joi.number().greater(0),
  gameId: Joi.number().greater(0),
  offset: Joi.number().min(0),
  limit: Joi.number().min(0),
  order: Joi.string().alphanum().trim(),
  desc: Joi.boolean().sensitive(),
  status: Joi.alternatives(["open", "closed"]),
  startDate: Joi.date().format("YYYY-MM-DD").max("now"),
  endDate: Joi.date().format("YYYY-MM-DD").min(Joi.ref("startDate")).max("now"),
});
