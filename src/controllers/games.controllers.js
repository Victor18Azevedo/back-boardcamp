import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function gamesList(req, res) {
  /*
    #swagger.tags = ['Games']
    #swagger.description = 'Route for list games.'
  */

  const orderPagesSQL = req.orderPagesSQL;
  const whereSQL = req.whereSQL;

  try {
    const games = await connection.query(
      `SELECT games.id AS "id", games.name AS "name", games."image", games."stockTotal", games."categoryId", games."pricePerDay", 
      categories.name AS "categoryName"
        FROM categories JOIN games ON (games."categoryId" = categories.id)
          ${whereSQL} ${orderPagesSQL}`
    );

    /* #swagger.responses[200] = {
            description: 'Games list successfully obtained.',
            schema: { $ref: '#/definitions/GamesList' }
    } */
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
    #swagger.tags = ['Games']
    #swagger.description = 'Route for insert a new game'
    #swagger.parameters['Add Game'] = {
      in: 'body',
      required: 'true',
      description: 'Add a new game',      
      schema: { $ref: '#/components/@schemas/AddGame' }
    }
  */

  const { name, image, stockTotal, categoryId, pricePerDay } = req.game;

  try {
    const result = await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")' +
        "SELECT $1,$2,$3,$4,$5 WHERE NOT EXISTS (SELECT name FROM games WHERE LOWER(name) = LOWER($1))",
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    if (result.rowCount === 0) {
      /* #swagger.responses[409] = {
            description: 'Game already exist',
      } */
      return res.sendStatus(409);
    }

    /* #swagger.responses[201] = {
            description: 'New game add with success',
    } */
    return res.sendStatus(201);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
