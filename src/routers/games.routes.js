import { Router } from "express";

import { gamesList, gamesInsert } from "../controllers/games.controllers.js";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.middleware.js";

const router = Router();

router.get("/games", gamesList);
router.post("/games", gameSchemaValidation, gamesInsert);

export default router;
