import chalk from "chalk";
import dayjs from "dayjs";

import { queriesSchema } from "../models/queriesSchema.models.js";

export function queriesSchemaValidation(req, res, next) {
  const query = req.query;

  const { error } = queriesSchema.validate(query, { abortEarly: false });
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

  next();
}
