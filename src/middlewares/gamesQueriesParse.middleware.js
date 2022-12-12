import chalk from "chalk";
import dayjs from "dayjs";

export async function gamesQueriesParse(req, res, next) {
  const { name } = req.query;

  try {
    const whereNameSQL = name
      ? `WHERE LOWER(games.name) LIKE LOWER('${name}%')`
      : "";

    req.whereSQL = whereNameSQL;
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
