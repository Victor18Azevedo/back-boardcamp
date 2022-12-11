import chalk from "chalk";
import dayjs from "dayjs";

import { rentalSchema } from "../models/rentalSchema.models.js";

export function rentalSchemaValidation(req, res, next) {
  const body = req.body;

  const { error } = rentalSchema.validate(body, { abortEarly: false });
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
  req.rental = { ...body };

  next();
}
