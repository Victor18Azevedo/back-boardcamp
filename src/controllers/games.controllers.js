import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function gamesList(req, res) {
  const orderPagesSQL = req.orderPagesSQL;
  const whereSQL = req.whereSQL;

  try {
    const games = await connection.query(
      `SELECT games.id AS "id", games.name AS "name", games."image", games."stockTotal", games."categoryId", games."pricePerDay", 
      categories.name AS "categoryName"
        FROM categories JOIN games ON (games."categoryId" = categories.id)
          ${whereSQL} ${orderPagesSQL}`
    );

    return res.send(games.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function gamesInsert(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.game;

  try {
    const result = await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")' +
        "SELECT $1,$2,$3,$4,$5 WHERE NOT EXISTS (SELECT name FROM games WHERE LOWER(name) = LOWER($1))",
      [name, image, stockTotal, categoryId, pricePerDay]
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
