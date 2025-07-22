import { ApiError } from "../utils/error.js";
import { DemoAccount } from "../services/demoAccount.js";
import User from "../schema/user.js";
import { Transaction } from "../schema/transaction.js";
import { Holding } from "../schema/holding.js";

export const DemoUser = {
  async buyStock(userId, symbol, quantity, price) {
    if (!symbol || !quantity || quantity <= 0 || !price) {
      throw new ApiError(400, "Invalid stock symbol or quantity or price");
    }

    const stock = await DemoAccount.GetStockBySymbol(symbol);
    if (!stock || stock.length === 0) {
      throw new ApiError(404, "Stock not found");
    }

    const currentPrice = stock.price;
    if (currentPrice > price) {
      throw new ApiError(400, "Price is less than current stock price");
    }

    const cost = quantity * currentPrice;

    // 1. Check User has enough funds
    const user = await User.findById(userId);
    if (!user || user.role !== "Demo") {
      throw new ApiError(403, "Only demo users can buy stock");
    }

    if (user.funds < cost) {
      throw new ApiError(400, "Insufficient funds");
    }

    // 2. Insert Transaction
    await Transaction.create({
      user: userId,
      symbol,
      quantity,
      price: currentPrice,
      type: "buy",
    });

    // 3. Update Holdings
    const holding = await Holding.findOne({ user: userId, symbol });

    if (holding) {
      // Weighted average formula
      const totalQty = holding.quantity + quantity;
      const newAvgPrice =
        (holding.quantity * holding.avgBuyPrice + quantity * currentPrice) /
        totalQty;

      holding.quantity = totalQty;
      holding.avgBuyPrice = newAvgPrice;
      await holding.save();
    } else {
      await Holding.create({
        user: userId,
        symbol,
        quantity,
        avgBuyPrice: currentPrice,
      });
    }

    // 4. Deduct funds
    user.funds -= cost;
    await user.save();

    return { message: "Stock purchased successfully" };
  },

  async sellStock(userId, symbol, quantity, price) {
    if (!symbol || !quantity || quantity <= 0 || !price) {
      throw new ApiError(400, "Invalid stock symbol, quantity, or price");
    }

    const stock = await DemoAccount.GetStockBySymbol(symbol);
    if (!stock || stock.length === 0) {
      throw new ApiError(404, "Stock not found");
    }

    const currentPrice = stock.price;
    if (currentPrice < price) {
      throw new ApiError(400, "Price is higher than current stock price");
    }

    // 1. Check user and holdings
    const user = await User.findById(userId);
    if (!user || user.role !== "Demo") {
      throw new ApiError(403, "Only demo users can sell stock");
    }

    const holding = await Holding.findOne({ user: userId, symbol });
    if (!holding || holding.quantity < quantity) {
      throw new ApiError(400, "Not enough holdings to sell");
    }

    // 2. Insert Transaction
    await Transaction.create({
      user: userId,
      symbol,
      quantity,
      price: currentPrice,
      type: "sell",
    });

    // 3. Update Holdings
    holding.quantity -= quantity;
    if (holding.quantity === 0) {
      await holding.deleteOne(); // Remove holding if fully sold
    } else {
      await holding.save();
    }

    // 4. Credit funds to user
    const totalProceeds = quantity * currentPrice;
    user.funds += totalProceeds;
    await user.save();

    return { message: "Stock sold successfully" };
  },

  async getUserHoldings(userId) {
    if (!userId) {
      throw new Error("User ID is required to fetch holdings");
    }

    const holdings = await Holding.find({ userId }).lean();

    return holdings;
  },
};
