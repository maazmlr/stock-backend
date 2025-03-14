import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    contactNo: {
      type: String,
      required: true,
      match: [/^\d+$/, "Contact number should contain only digits"],
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Demo", "Real", "Admin"], // Three user roles
      required: true,
      default: "Demo", // Default role is Demo
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("Comparing passwords...");
  console.log("Candidate Password:", candidatePassword);
  console.log("Hashed Password:", this.password);

  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

  return resetToken; // Send unhashed token to user
};

const User = mongoose.model("User", userSchema);

export default User;
