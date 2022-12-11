import Joi from "joi";

export const queriesSchema = Joi.object({
  customerId: Joi.number().greater(0),
  gameId: Joi.number().greater(0),
});
