import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function rentalsList(req, res) {
  /*
    #swagger.tags = ['Rentals']
    #swagger.description = 'Route for list rentals.'
  */

  const orderPagesSQL = req.orderPagesSQL;
  const whereSQL = req.whereSQL;

  try {
    const result = await connection.query(
      `SELECT rentals."id" AS "id", rentals."customerId", rentals."gameId", rentals."rentDate"::text,
      rentals."daysRented", rentals."returnDate"::text, rentals."originalPrice", rentals."delayFee",
      customers."id" AS "customersId", customers."name" AS "customersName",
      games."id" AS "gamesId", games."name" AS "gameName", games."categoryId" AS "gameCategoryId",
      categories.name AS "gameCategoryName"
      FROM rentals
          JOIN customers ON rentals."customerId" =  customers.id
          JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id
            ${whereSQL} ${orderPagesSQL}`
    );

    const rentals = result.rows.map((r) => ({
      id: r.id,
      customerId: r.customerId,
      gameId: r.gameId,
      rentDate: r.rentDate,
      daysRented: r.daysRented,
      returnDate: r.returnDate,
      originalPrice: r.originalPrice,
      delayFee: r.delayFee,
      customer: {
        id: r.customersId,
        name: r.customersName,
      },
      game: {
        id: r.gamesId,
        name: r.gameName,
        categoryId: r.gameCategoryId,
        categoryName: r.gameCategoryName,
      },
    }));

    return res.send(rentals);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function rentalInsert(req, res) {
  /*
    #swagger.tags = ['Rentals']
    #swagger.description = 'Route for create a new rental.'
  */

  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
  } = req.rental;

  try {
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function rentalClose(req, res) {
  /*
    #swagger.tags = ['Rentals']
    #swagger.description = 'Route for close a opened rental.'
  */

  const { id, originalPrice, daysRented, rentDate } = req.rental;

  try {
    const pricePerDay = originalPrice / daysRented;

    const returnDate = dayjs();
    const expectedReturnDate = dayjs(rentDate).add(daysRented, "days");
    const delayFee =
      returnDate > expectedReturnDate
        ? returnDate.diff(expectedReturnDate, "day") * pricePerDay
        : 0;

    await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [returnDate.format("YYYY-MM-DD"), delayFee, id]
    );

    return res.sendStatus(200);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function rentalDelete(req, res) {
  /*
    #swagger.tags = ['Rentals']
    #swagger.description = 'Route for delete a closed rental.'
  */

  const { id } = req.rental;

  try {
    await connection.query(`DELETE FROM rentals WHERE "id" = $1`, [id]);
    return res.sendStatus(200);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
