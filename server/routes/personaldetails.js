import express from "express";
const router = express.Router();

import { add, update } from "../controllers/personaldetails.js";
import { edit } from "../controllers/personaldetails.js";

router.post("/add", add);
router.get("/edit/:id", edit);
router.post("/update/:id", update);

export default router;