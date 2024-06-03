import express from "express";
import { signup, signin, updateImg } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/updateImg", updateImg);
export default router;
