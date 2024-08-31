import mongoose from "mongoose";

import Comment from "./Comment";

const replySchema = new mongoose.Schema(
  {
    body: { type: String, required: true },

    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);


const Reply = mongoose.models?.Reply || mongoose.model("Reply", replySchema);

export default Reply;
