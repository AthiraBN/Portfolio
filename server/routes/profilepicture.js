import express from "express";
const router = express.Router();

import { add, update } from "../controllers/profilepicture.js";
import { edit } from "../controllers/profilepicture.js";

router.post("/add", add);
router.get("/edit/:id", edit);
router.post("/update/:id", update);

export default router;