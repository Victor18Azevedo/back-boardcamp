import chalk from "chalk";
import dayjs from "dayjs";

export async function customersQueriesParse(req, res, next) {
  const { cpf } = req.query;

  try {
    const whereCpfSQL = cpf ? `WHERE cpf LIKE '${cpf}%'` : "";

    req.whereSQL = whereCpfSQL;
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
