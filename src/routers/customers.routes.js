import { Router } from "express";

import { customersList } from "../controllers/customers.controllers.js";

const router = Router();

router.get("/customers", customersList);

export default router;
