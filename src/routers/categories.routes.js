import { Router } from "express";

import { categoriesList } from "../controllers/categories.controllers.js";

const router = Router();

router.get("/categories", categoriesList);

export default router;
