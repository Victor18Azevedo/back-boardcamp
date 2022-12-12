import { Router } from "express";

import {
  customersList,
  getCustomer,
  customerInsert,
  customerUpdate,
} from "../controllers/customers.controllers.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.middleware.js";
import { paginationQueriesParse } from "../middlewares/paginationQueriesParse.middleware.js";
import { customersQueriesParse } from "../middlewares/customersQueriesParse.middleware.js";
import { queriesSchemaValidation } from "../middlewares/queriesSchemaValidation.middleware.js";

const router = Router();

router.get(
  "/customers",
  queriesSchemaValidation,
  paginationQueriesParse,
  customersQueriesParse,
  customersList
);
router.get("/customers/:id", getCustomer);
router.post("/customers/", customerSchemaValidation, customerInsert);
router.put("/customers/:id", customerSchemaValidation, customerUpdate);

export default router;
