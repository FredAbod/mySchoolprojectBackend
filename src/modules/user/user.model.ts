import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    ageGroup: { type: String, enum: ["kid", "teen"], required: true },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
