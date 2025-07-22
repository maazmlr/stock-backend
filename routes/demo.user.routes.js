import { Router } from "express";
import { BuyStock, getHoldingsController, sellStock } from "../controllers/demo.user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.route("/buy-stock").post(authenticate, BuyStock); // ✅ apply middleware
router.route("/sell-stock").post(authenticate, sellStock); // ✅ apply middleware
router.route("/holdings").get(authenticate, getHoldingsController); // ✅ apply middleware

export default router;
