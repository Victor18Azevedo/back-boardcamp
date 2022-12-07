import chalk from "chalk";
import dayjs from "dayjs";

import { gameSchema } from "../models/gameSchema.models.js";

export function gameSchemaValidation(req, res, next) {
  const body = req.body;

  const { error } = gameSchema.validate(body, { abortEarly: false });
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
  req.game = body;

  next();
}
