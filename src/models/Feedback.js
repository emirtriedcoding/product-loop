import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Feedback =
  mongoose.models?.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
