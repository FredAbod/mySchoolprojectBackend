import { Schema, model } from "mongoose";

const attemptSchema = new Schema({
  id: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  challengeId: { type: String, required: true },
  type: { type: String, enum: ["grid", "quiz"], required: true, default: "grid" },
  success: { type: Boolean, required: true },
  timeTaken: { type: Number, required: true },
  movesUsed: { type: Number, required: true, default: 0 },
  answer: { type: Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now },
});

attemptSchema.index({ userId: 1, id: 1 }, { unique: true });

export const Attempt = model("Attempt", attemptSchema);
