import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const queriesSchema = Joi.object({
  customerId: Joi.number().greater(0),
  gameId: Joi.number().greater(0),
  offset: Joi.number().greater(0),
  limit: Joi.number().greater(0),
  order: Joi.string(),
  desc: Joi.alternatives(["true", "false"]),
  status: Joi.alternatives(["open", "closed"]),
  startDate: Joi.date().format("YYYY-MM-DD").max("now"),
  endDate: Joi.date().format("YYYY-MM-DD").min(Joi.ref("startDate")).max("now"),
});
