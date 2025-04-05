import { Router } from "express";
import { TickerData } from "../controllers/stock.data.controller.js";

const router = Router();

router.route("/ticker-data").get(TickerData);

export default router;
