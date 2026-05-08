import { Schema, model } from "mongoose";

const lessonChallengeSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ["grid", "quiz"], required: true },
    title: { type: String, required: true },
    concept: { type: String, required: true },
    prompt: { type: String, required: true },
    goal: { type: String, required: true },
    examples: { type: [String], default: [] },
    hints: { type: [String], default: [] },
    hint: { type: String, default: "" },
    scenes: {
      type: [
        {
          id: { type: String, required: true },
          speaker: { type: String, default: "" },
          text: { type: String, required: true },
        },
      ],
      default: [],
    },
    grid: {
      type: {
        width: Number,
        height: Number,
        blocked: [{ x: Number, y: Number }],
      },
      default: null,
    },
    start: {
      type: { x: Number, y: Number, dir: { type: String, enum: ["N", "E", "S", "W"] } },
      default: null,
    },
    goalPos: { type: { x: Number, y: Number }, default: null },
    quiz: {
      type: {
        kind: { type: String, enum: ["number", "text", "multipleChoice"] },
        question: String,
        answer: Schema.Types.Mixed,
        acceptableAnswers: [String],
        choices: [{ id: String, label: String }],
        correctChoiceId: String,
        explanation: String,
      },
      default: null,
    },
  },
  { _id: false }
);

const lessonSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true, default: "" },
    ageGroup: { type: String, enum: ["kid", "teen"], required: true, default: "kid" },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    published: { type: Boolean, default: true },
    challenges: { type: [lessonChallengeSchema], default: [] },
  },
  { timestamps: true }
);

export const Lesson = model("Lesson", lessonSchema);

