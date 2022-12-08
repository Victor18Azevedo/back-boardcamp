import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function gameIdValidation(req, res, next) {
  const { gameId } = req.rental;

  try {
    const games = await connection.query("SELECT * FROM games WHERE id = $1", [
      gameId,
    ]);
    if (games.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: invalid gameId"
        )
      );
      return res.sendStatus(400);
    }

    req.game = { ...games.rows[0] };
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
