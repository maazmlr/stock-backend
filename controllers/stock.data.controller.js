import { StockData } from "../services/stock.data.js";
import { ApiResponsone } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const TickerData = asyncHandler(async (req, res) => {
  try {
    const result = await StockData.tickerData();
    const response = new ApiResponsone(
      200,
      result,
      "Data Fetched successfully"
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Something Went Wrong"
    );
    return res.status(response.statusCode).json(response);
  }
});

export {TickerData}