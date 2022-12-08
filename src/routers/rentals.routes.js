import { Router } from "express";

import { rentalInsert } from "../controllers/rentals.controllers.js";
import { customerIdValidation } from "../middlewares/customerIdValidation.middleware.js";
import { gameIdValidation } from "../middlewares/gameIdValidation.middleware.js";
import { rentalSchemaValidation } from "../middlewares/rentalSchemaValidation.middleware.js";
import { rentalParse } from "../middlewares/rentalParse.middleware.js";

const router = Router();

router.post(
  "/rentals",
  rentalSchemaValidation,
  customerIdValidation,
  gameIdValidation,
  rentalParse,
  rentalInsert
);

export default router;
