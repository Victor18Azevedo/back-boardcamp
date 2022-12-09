import chalk from "chalk";
import dayjs from "dayjs";

export async function rentalClosedValidation(req, res, next) {
  const { returnDate } = req.rental;

  try {
    if (returnDate === null) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: rental must be closed"
        )
      );
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
