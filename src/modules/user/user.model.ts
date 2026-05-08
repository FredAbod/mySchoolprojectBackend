import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    ageGroup: { type: String, enum: ["kid", "teen"], required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    lastActiveAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
