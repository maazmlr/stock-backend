import { Router } from "express";
import {
  singleStock,
  StockListing,
} from "../controllers/demo.account.controller.js";

const router = Router();

router.route("/stock-listing").get(StockListing);

router.route("/stock/:symbol").get(singleStock);

export default router;
