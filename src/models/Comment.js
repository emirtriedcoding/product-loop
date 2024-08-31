import mongoose from "mongoose";

import User from "./User";
import Product from "./Product";
import Reply from "./Reply";

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
