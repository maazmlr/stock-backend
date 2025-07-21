import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    avgBuyPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Holding = mongoose.model("Holding", holdingSchema);
