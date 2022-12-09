import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function rentalIdValidation(req, res, next) {
  const { id } = req.params;

  try {
    const rentals = await connection.query(
      "SELECT * FROM rentals WHERE id = $1",
      [id]
    );
    if (rentals.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: invalid rental id"
        )
      );
      return res.sendStatus(404);
    }

    req.rental = rentals.rows[0];
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
