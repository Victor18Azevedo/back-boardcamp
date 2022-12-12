import chalk from "chalk";
import dayjs from "dayjs";

export async function paginationQueriesParse(req, res, next) {
  const { offset, limit, order, desc } = req.query;

  try {
    const orderSQL = order ? `ORDER BY "${order}" ` : `ORDER BY id `;
    const descSQL = desc === "true" ? `DESC ` : `ASC `;
    const offsetSQL = offset ? `OFFSET ${offset} ` : "";
    const limitSQL = limit ? `LIMIT ${limit} ` : "";

    req.orderPagesSQL = orderSQL.concat(descSQL, offsetSQL, limitSQL);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
