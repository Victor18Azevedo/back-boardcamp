import { Router } from "express";

import {
  customersList,
  getCustomer,
  customerInsert,
  customerUpdate,
} from "../controllers/customers.controllers.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.middleware.js";

const router = Router();

router.get("/customers", customersList);
router.get("/customers/:id", getCustomer);
router.post("/customers/", customerSchemaValidation, customerInsert);
router.put("/customers/:id", customerSchemaValidation, customerUpdate);

export default router;
