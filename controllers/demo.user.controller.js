import { DemoUser } from "../services/demoUser.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const BuyStock = asyncHandler(async (req, res) => {
  const { user } = req; // Assuming user is attached to req by authenticate middleware
  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }
  const { symbol, quantity, price } = req.body;

  try {
    const result = await DemoUser.buyStock(user._id, symbol, quantity, price);
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

async function getHoldingsController(req, res) {
  try {
    const userId = req.user._id; // assumes user is set from auth middleware

    const holdings = await DemoUser.getUserHoldings(userId);

    return res.status(200).json({
      success: true,
      data: holdings,
    });
  } catch (error) {
    console.error("Error fetching holdings:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch holdings",
    });
  }
}

export { BuyStock, sellStock, getHoldingsController };
