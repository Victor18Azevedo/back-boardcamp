import { Router } from "express";

import { gamesList, gamesInsert } from "../controllers/games.controllers.js";
import { categoryIdValidation } from "../middlewares/categoryIdValidation.middleware.js";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.middleware.js";

const router = Router();

router.get("/games", gamesList);
router.post("/games", gameSchemaValidation, categoryIdValidation, gamesInsert);

export default router;
