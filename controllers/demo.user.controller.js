import { DemoUser } from "../services/demoUser.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const BuyStock = asyncHandler(async (req, res) => {
  const { symbol, quantity, price } = req.body;

  try {
    const result = await DemoUser.buyStock("", symbol, quantity, price);
    return res.status(200).json({
      success: true,
      message: "Stock purchased successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error in BuyStock:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

const sellStock = asyncHandler(async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    const result = await DemoUser.sellStock(userId, symbol, quantity, price);
    return res.status(200).json({
      success: true,
      message: "Stock sold successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error in SellStock:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

export { BuyStock, sellStock };
