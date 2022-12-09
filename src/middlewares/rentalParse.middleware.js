import chalk from "chalk";
import dayjs from "dayjs";

export async function rentalParse(req, res, next) {
  const { daysRented } = req.rental;
  const { pricePerDay } = req.game;

  try {
    req.rental.returnDate = null;
    req.rental.delayFee = null;
    // req.rental.rentDate = dayjs().format("YYYY-MM-DD");
    req.rental.rentDate = dayjs("2022-12-01").format("YYYY-MM-DD");
    req.rental.originalPrice = daysRented * pricePerDay;
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
