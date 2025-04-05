import { ApiError } from "../utils/error.js";

export const StockData = {
  async tickerData() {
    try {
      const response = await fetch(
        "http://166.62.87.152/~tauruson/data"
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      const text = await response.json();

      return text;
    } catch (error) {
      console.log(error,"eorr")
      throw new ApiError(400, "Some thing went wrong");
    }
  },
};
