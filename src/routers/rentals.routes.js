import { Router } from "express";

import {
  rentalsList,
  rentalInsert,
  rentalClose,
  rentalDelete,
} from "../controllers/rentals.controllers.js";
import { customerIdValidation } from "../middlewares/customerIdValidation.middleware.js";
import { gameIdValidation } from "../middlewares/gameIdValidation.middleware.js";
import { gameAvailabilityValidation } from "../middlewares/gameAvailabilityValidation.middleware.js";
import { rentalIdValidation } from "../middlewares/rentalIdValidation.middleware.js";
import { rentalOpenedValidation } from "../middlewares/rentalOpenedValidation.middleware.js";
import { rentalClosedValidation } from "../middlewares/rentalClosedValidation.middleware.js";
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
  rentalOpenedValidation,
  rentalClose
);
router.delete(
  "/rentals/:id",
  rentalIdValidation,
  rentalClosedValidation,
  rentalDelete
);

export default router;
