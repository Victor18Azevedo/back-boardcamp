import { Router } from "express";

import {
  customersList,
  getCustomer,
  customerInsert,
} from "../controllers/customers.controllers.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.middleware.js";

const router = Router();

router.get("/customers", customersList);
router.get("/customers/:id", getCustomer);
router.post("/customers/", customerSchemaValidation, customerInsert);

export default router;
