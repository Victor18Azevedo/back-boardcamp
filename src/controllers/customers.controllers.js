import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function customersList(req, res) {
  const { cpf } = req.query;

  try {
    if (cpf) {
      const cpfStart = cpf + "%";
      const customers = await connection.query(
        "SELECT * FROM customers WHERE cpf LIKE $1",
        [cpfStart]
      );
      return res.send(customers.rows);
    }

    const customers = await connection.query("SELECT * FROM customers");
    return res.send(customers.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
