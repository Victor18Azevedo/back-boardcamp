import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function rentalsList(req, res) {
  const { customerId, gameId } = req.query;

  try {
    // TODO: insert customer and game in response
    // TODO: implement query customerId
    // TODO: implement query gameId

    const rentals = await connection.query(`
    SELECT * FROM rentals
      INNER JOIN customers ON rentals."customerId" = customers.id
      INNER JOIN games ON rentals."gameId" = games.id`);
    return res.send(rentals.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function rentalInsert(req, res) {
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
