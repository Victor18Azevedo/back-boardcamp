import { Router } from "express";

import {
  categoriesList,
  categoriesInsert,
} from "../controllers/categories.controllers.js";
import { categorySchemaValidation } from "../middlewares/categorySchemaValidation.middleware.js";

const router = Router();

router.get("/categories", categoriesList);
router.post("/categories", categorySchemaValidation, categoriesInsert);

export default router;
