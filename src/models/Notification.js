import mongoose from "mongoose";

import User from "./User";
import Product from "./Product";

const notificationSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },

    type: {
      type: String,
      enum: ["Upvote", "Comment", "Like", "Reply", "Status"],
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Notification =
  mongoose.models?.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
