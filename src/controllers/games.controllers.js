import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function gamesList(req, res) {
  /*
    #swagger.description = 'Route for list games.'
  */

  const { name } = req.query;

  try {
    if (name) {
      const games = await connection.query(
        'SELECT *, categories.name AS "categoryName" FROM categories JOIN games ON (games."categoryId" = categories.id) WHERE LOWER(games.name) LIKE LOWER($1)',
        [name.concat("%")]
      );
      return res.send(games.rows);
    }

    // array to json
    const games = await connection.query(`
      SELECT * FROM games g
        LEFT JOIN LATERAL (
          SELECT array(SELECT name FROM categories WHERE categories.id = g.id) AS category) n ON true`);

    // array to json
    // const games = await connection.query(`
    //   SELECT array_to_json(ARRAY(
    //     SELECT row_to_json(n)
    //     FROM games g
    //     LEFT JOIN LATERAL (SELECT g.name, array(SELECT name FROM categories WHERE categories.id = g.id) AS category) n ON true
    //     ))`);

    // FIX: basic JOIN
    // const games = await connection.query(
    //   'SELECT *, categories.name AS "categoryName" FROM categories JOIN games ON (games."categoryId" = categories.id)'
    // );
    return res.send(games.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function gamesInsert(req, res) {
  /*
    #swagger.description = 'Route for insert a new game'
  */

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
