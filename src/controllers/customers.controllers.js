import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function customersList(req, res) {
  const { cpf } = req.query;

  try {
    if (cpf) {
      const customers = await connection.query(
        "SELECT *, birthday::text FROM customers WHERE cpf LIKE $1",
        [cpf.concat("%")]
      );
      return res.send(customers.rows);
    }

    const customers = await connection.query(
      "SELECT *, birthday::text FROM customers"
    );
    return res.send(customers.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function getCustomer(req, res) {
  const { id } = req.params;

  try {
    const customer = await connection.query(
      "SELECT *, birthday::text FROM customers WHERE id = $1",
      [id]
    );
    if (customer.rowCount === 0) {
      return res.sendStatus(404);
    }
    return res.send(customer.rows[0]);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function customerInsert(req, res) {
  const { name, phone, cpf, birthday } = req.customer;

  try {
    const result = await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday)" +
        "SELECT $1, $2, $3::VARCHAR, $4 WHERE NOT EXISTS (SELECT cpf FROM customers WHERE cpf = $3)",
      [name, phone, cpf, birthday]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(409);
    }

    return res.sendStatus(201);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function customerUpdate(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.customer;

  try {
    const cpfDuplicate = await connection.query(
      "SELECT cpf FROM customers WHERE cpf = $1 AND id <> $2",
      [cpf, id]
    );

    if (cpfDuplicate.rowCount !== 0) {
      return res.sendStatus(409);
    }

    const result = await connection.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3::VARCHAR, birthday = $4" +
        "WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );

    if (result.rowCount !== 1) {
      return res.sendStatus(400);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
