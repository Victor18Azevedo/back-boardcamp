import { Router } from "express";

import { gamesList, gamesInsert } from "../controllers/games.controllers.js";
import { categoryIdValidation } from "../middlewares/categoryIdValidation.middleware.js";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.middleware.js";
import { queriesSchemaValidation } from "../middlewares/queriesSchemaValidation.middleware.js";
import { paginationQueriesParse } from "../middlewares/paginationQueriesParse.middleware.js";
import { gamesQueriesParse } from "../middlewares/gamesQueriesParse.middleware.js";

const router = Router();

router.get(
  "/games",
  queriesSchemaValidation,
  paginationQueriesParse,
  gamesQueriesParse,
  gamesList
);
router.post("/games", gameSchemaValidation, categoryIdValidation, gamesInsert);

export default router;
