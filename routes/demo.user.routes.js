import { Router } from "express";
import { BuyStock } from "../controllers/demo.user.controller.js";

const router = Router();

router.route("/buy-stock").post(BuyStock);

export default router;
