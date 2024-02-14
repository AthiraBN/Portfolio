import express from "express";
const router = express.Router();

import { add, update } from "../controllers/experience.js";
import { edit, remove } from "../controllers/experience.js";

router.post("/add", add);
router.get("/edit/:id", edit);
router.post("/update/:id", update);
router.post("/remove/:id", remove);

export default router;