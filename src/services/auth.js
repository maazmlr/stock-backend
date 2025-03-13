import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/user.js"; // Ensure correct path
import { ApiError } from "../utils/error.js"; // Import ApiError
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Config
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const authService = {
  async signUp(payload) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) {
        throw new ApiError(400, "Email already in use");
      }

      // Create new user
      const newUser = new User({
        ...payload,
        role: payload.role || "Demo", // Default role
      });

      // Save user (password hashed by pre-save hook)
      const user = await newUser.save();

      // Create JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      // Return user data without password
      const userData = user.toObject();
      delete userData.password;

      return { user: userData, token };
    } catch (error) {
      throw new ApiError(400, error.message || "Registration failed");
    }
  },

  async login(payload) {
    try {
      // Find user by email
      const user = await User.findOne({ email: payload.email }).select(
        "+password"
      );
      if (!user) {
        throw new ApiError(400, "Invalid credentials");
      }

      console.log(payload);

      // Verify password
      const isMatch = await user.comparePassword(payload.password);

      console.log(isMatch);

      if (!isMatch) {
        throw new ApiError(400, "Password not matched");
      }

      // Create JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      // Return user data without password
      const userData = user.toObject();
      delete userData.password;

      return { user: userData, token };
    } catch (error) {
      throw new ApiError(400, error.message || "Login failed");
    }
  },

  async forgotPassword(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User with this email does not exist");
    }

    // Generate password reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const message = `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link expires in 10 minutes.`;

    await sendEmail({ email: user.email, subject: "Password Reset", message });

    return { message: "Password reset link sent to email" };
  },

  async resetPassword(token, newPassword) {
    // Hash the received token to match the stored hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    // Hash the new password and update user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: "Password reset successful" };
  },

  async getAllRealUsers() {
    try {
      const users = await User.find({ role: "Real" }).select("-password"); // Exclude passwords
      return { users };
    } catch (error) {
      throw new ApiError(500, error.message || "Failed to fetch users");
    }
  },
};
