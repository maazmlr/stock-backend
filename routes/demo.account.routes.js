import { Router } from "express";
import { StockListing } from "../controllers/demo.account.controller.js";

const router = Router();

router.route("/stock-listing").get(StockListing);

export default router;
