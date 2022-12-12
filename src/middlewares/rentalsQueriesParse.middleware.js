import chalk from "chalk";
import dayjs from "dayjs";

export async function rentalsQueriesParse(req, res, next) {
  const { status, startDate, endDate, customerId, gameId } = req.query;

  try {
    const whereFiltersList = [];
    if (customerId) {
      whereFiltersList.push(`customers."id" = ${customerId}`);
    }
    if (gameId) {
      whereFiltersList.push(`games."id" = ${gameId}`);
    }
    if (startDate) {
      whereFiltersList.push(`rentals."rentDate" >= '${startDate}'::date`);
    }
    if (endDate) {
      whereFiltersList.push(`rentals."rentDate" <= '${endDate}'::date`);
    }
    if (status === "open") {
      whereFiltersList.push('rentals."returnDate" IS NULL');
    } else if (status === "closed") {
      whereFiltersList.push('rentals."returnDate" IS NOT NULL');
    }

    let whereRentalsSQL = "";
    if (whereFiltersList.length > 0) {
      whereRentalsSQL = whereRentalsSQL.concat(
        "WHERE ",
        whereFiltersList.join(" AND ")
      );
    }

    req.whereSQL = whereRentalsSQL;
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
