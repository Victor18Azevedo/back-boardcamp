import { Router } from "express";

import {
  rentalsList,
  rentalInsert,
  rentalClose,
} from "../controllers/rentals.controllers.js";
import { customerIdValidation } from "../middlewares/customerIdValidation.middleware.js";
import { gameIdValidation } from "../middlewares/gameIdValidation.middleware.js";
import { gameAvailabilityValidation } from "../middlewares/gameAvailabilityValidation.middleware.js";
import { rentalIdValidation } from "../middlewares/rentalIdValidation.middleware.js";
import { rentalOpenValidation } from "../middlewares/rentalOpenValidation.middleware.js";
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
router.post(
  "/rentals/:id/return",
  rentalIdValidation,
  rentalOpenValidation,
  rentalClose
);

export default router;
