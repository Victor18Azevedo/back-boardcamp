import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function gameAvailabilityValidation(req, res, next) {
  const { id, stockTotal } = req.game;

  try {
    const rentalsOfGameId = await connection.query(
      'SELECT * FROM rentals WHERE "gameId" = $1',
      [id]
    );
    if (rentalsOfGameId.rowCount >= stockTotal) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: game stock unavailable"
        )
      );
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
