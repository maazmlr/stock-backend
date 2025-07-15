import { ApiError } from "../utils/error.js";

export const DemoAccount = {
  async StockListing() {
    try {
      const response = await fetch("http://166.62.87.152/~tauruson/data");

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      const text = await response.json();

      return text;
    } catch (error) {
      console.log(error, "eorr");
      throw new ApiError(400, "Some thing went wrong");
    }
  },

  async GetStockBySymbol(symbol) {
    try {
      // First get all stocks
      const allStocks = await this.StockListing();

      // Filter for the specific stock by SYMBOL
      const stock = allStocks.find(
        (stock) =>
          stock.SYMBOL && stock.SYMBOL.toLowerCase() === symbol.toLowerCase()
      );

      if (!stock) {
        throw new ApiError(404, `Stock with symbol '${symbol}' not found`);
      }

      return stock;
    } catch (error) {
      console.log(error, "error in GetStockBySymbol");

      // If it's already an ApiError, re-throw it
      if (error instanceof ApiError) {
        throw error;
      }

      // Otherwise, wrap it in a generic error
      throw new ApiError(400, "Something went wrong while fetching stock");
    }
  },
};
