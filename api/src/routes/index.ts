import { Router } from "express";
import { verifyOTP } from "../controllers";

const router = Router();

router.post("/verify", verifyOTP);

export default router;
