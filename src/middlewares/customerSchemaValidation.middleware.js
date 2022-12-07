import chalk from "chalk";
import dayjs from "dayjs";

import { customerSchema } from "../models/customerSchema.models.js";

export function customerSchemaValidation(req, res, next) {
  const body = req.body;

  const { error } = customerSchema.validate(body, { abortEarly: false });
  if (error) {
    const message = error.details.map((detail) => detail.message);
    console.log(
      chalk.magentaBright(
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
        "- BAD_REQUEST:",
        message
      )
    );
    return res.status(400).send({ message });
  }
  req.customer = body;

  next();
}
