import { Router } from "express";

import {
  rentalsList,
  rentalInsert,
  rentalClose,
  rentalDelete,
} from "../controllers/rentals.controllers.js";
import { customerIdValidation } from "../middlewares/customerIdValidation.middleware.js";
import { gameIdValidation } from "../middlewares/gameIdValidation.middleware.js";
import { queriesSchemaValidation } from "../middlewares/queriesSchemaValidation.middleware.js";
import { gameAvailabilityValidation } from "../middlewares/gameAvailabilityValidation.middleware.js";
import { rentalIdValidation } from "../middlewares/rentalIdValidation.middleware.js";
import { rentalOpenedValidation } from "../middlewares/rentalOpenedValidation.middleware.js";
import { rentalClosedValidation } from "../middlewares/rentalClosedValidation.middleware.js";
import { rentalSchemaValidation } from "../middlewares/rentalSchemaValidation.middleware.js";
import { rentalParse } from "../middlewares/rentalParse.middleware.js";
import { rentalsQueriesParse } from "../middlewares/rentalsQueriesParse.middleware.js";
import { paginationQueriesParse } from "../middlewares/paginationQueriesParse.middleware.js";

const router = Router();

router.get(
  "/rentals",
  queriesSchemaValidation,
  paginationQueriesParse,
  rentalsQueriesParse,
  rentalsList
);
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
