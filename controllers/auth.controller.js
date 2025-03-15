import { asyncHandler } from "../utils/asyncHandler.js";
import { authService } from "../services/auth.js";
import { ApiResponsone } from "../utils/Apiresponse.js";

const RegisterUser = asyncHandler(async (req, res) => {
  try {
    const result = await authService.signUp(req.body);
    const response = new ApiResponsone(
      200,
      result,
      "User registered successfully"
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Registration failed"
    );
    return res.status(response.statusCode).json(response);
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  try {
    const result = await authService.login(req.body);
    const response = new ApiResponsone(200, result, "User login successfully");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Login failed"
    );
    return res.status(response.statusCode).json(response);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const result = await authService.login(req.body);
    const response = new ApiResponsone(200, result, "User login successful");
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Login failed"
    );
    return res.status(response.statusCode).json(response);
  }
});

// 📌 FORGOT PASSWORD
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    const response = new ApiResponsone(
      200,
      result,
      "Password reset link sent to email"
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Failed to send reset email"
    );
    return res.status(response.statusCode).json(response);
  }
});

// 📌 RESET PASSWORD
const resetPassword = asyncHandler(async (req, res) => {
  console.log(req.body.newPassword, "mee");
  try {
    const result = await authService.resetPassword(
      req.params.token,
      req.body.newPassword
    );
    const response = new ApiResponsone(
      200,
      result,
      "Password reset successful"
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Password reset failed"
    );
    return res.status(response.statusCode).json(response);
  }
});

const getAllRealUsers = asyncHandler(async (req, res) => {
  try {
    const result = await authService.getAllRealUsers();
    const response = new ApiResponsone(
      200,
      result,
      "Fetched users successfully"
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiResponsone(
      400,
      null,
      error.message || "Failed to fetch users"
    );
    return res.status(response.statusCode).json(response);
  }
});

export {
  RegisterUser,
  LoginUser,
  forgotPassword,
  resetPassword,
  getAllRealUsers,
};
