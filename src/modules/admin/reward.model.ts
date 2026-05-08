import { Schema, model } from "mongoose";

const rewardSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    costCoins: { type: Number, required: true, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Reward = model("Reward", rewardSchema);

