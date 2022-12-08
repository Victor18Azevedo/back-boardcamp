import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function customerIdValidation(req, res, next) {
  const { customerId } = req.rental;

  try {
    const customers = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [customerId]
    );
    if (customers.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: invalid customerId"
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
