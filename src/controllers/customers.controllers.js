import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function customersList(req, res) {
  try {
    const customers = await connection.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
