import { Router } from "express";

import {
  rentalsList,
  rentalInsert,
} from "../controllers/rentals.controllers.js";
import { customerIdValidation } from "../middlewares/customerIdValidation.middleware.js";
import { gameIdValidation } from "../middlewares/gameIdValidation.middleware.js";
import { gameAvailabilityValidation } from "../middlewares/gameAvailabilityValidation.middleware.js";
import { rentalSchemaValidation } from "../middlewares/rentalSchemaValidation.middleware.js";
import { rentalParse } from "../middlewares/rentalParse.middleware.js";

const router = Router();

router.get("/rentals", rentalsList);
router.post(
  "/rentals",
  rentalSchemaValidation,
  customerIdValidation,
  gameIdValidation,
  rentalParse,
  gameAvailabilityValidation,
  rentalInsert
);

export default router;
