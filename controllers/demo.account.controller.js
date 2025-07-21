import { DemoAccount } from "../services/demoAccount.js";
import { ApiResponsone } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const StockListing = asyncHandler(async (req, res) => {
  try {
    const result = await DemoAccount.StockListing();
    const response = new ApiResponsone(
      200,
      result,
      "Data Fetched successfully"
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResRponsone(
      400,
      null,
      error.message || "Something Went Wrong"
    );
    return res.status(response.statusCode).json(response);
  }
});

const singleStock = asyncHandler(async (req, res) => {
  try {
    const { symbol } = req.params;
    const result = await DemoAccount.GetStockBySymbol(symbol);
    const response = new ApiResponsone(
      200,
      result,
      `Stock with symbol '${symbol}' fetched successfully`
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

export { StockListing, singleStock };
