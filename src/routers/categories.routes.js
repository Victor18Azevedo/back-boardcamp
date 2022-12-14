import { Router } from "express";

import {
  categoriesList,
  categoriesInsert,
} from "../controllers/categories.controllers.js";
import { categorySchemaValidation } from "../middlewares/categorySchemaValidation.middleware.js";
import { paginationQueriesParse } from "../middlewares/paginationQueriesParse.middleware.js";
import { queriesSchemaValidation } from "../middlewares/queriesSchemaValidation.middleware.js";

const router = Router();

router.get(
  "/categories",
  queriesSchemaValidation,
  paginationQueriesParse,
  categoriesList
);
router.post("/categories", categorySchemaValidation, categoriesInsert);

export default router;
