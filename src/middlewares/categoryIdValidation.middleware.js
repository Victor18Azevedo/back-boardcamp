import chalk from "chalk";
import dayjs from "dayjs";
import connection from "../database/db.js";

export async function categoryIdValidation(req, res, next) {
  const { categoryId } = req.game;

  try {
    const categories = await connection.query(
      "SELECT id FROM categories WHERE id = $1",
      [categoryId]
    );
    if (categories.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: invalid categoryId"
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
