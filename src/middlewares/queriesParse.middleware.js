import chalk from "chalk";
import dayjs from "dayjs";

export async function queriesParse(req, res, next) {
  const { cpf, offset, limit, order, desc } = req.query;

  try {
    const orderSQL = order ? `ORDER BY "${order}"` : "ORDER BY id";
    const descSQL = desc === "true" ? "DESC" : "ASC";
    const offsetSQL = offset ? `OFFSET ${offset}` : "";
    const limitSQL = limit ? `LIMIT ${limit}` : "";
    const whereCpfSQL = cpf ? `WHERE cpf LIKE '${cpf}%'` : "";

    req.queriesSQL = { orderSQL, descSQL, offsetSQL, limitSQL, whereCpfSQL };
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
