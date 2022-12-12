import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function categoriesList(req, res) {
  /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Route for list categories.'
  */

  const orderPagesSQL = req.orderPagesSQL;

  try {
    const categories = await connection.query(
      `SELECT * FROM categories ${orderPagesSQL}`
    );
    res.send(categories.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function categoriesInsert(req, res) {
  /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Route for insert new category.'
  */

  //  format: <string>,

  const { name } = req.category;
  try {
    const result = await connection.query(
      "INSERT INTO categories (name) SELECT $1 WHERE NOT EXISTS (SELECT name FROM categories WHERE LOWER(name) = LOWER($1))",
      [name]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(409);
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
