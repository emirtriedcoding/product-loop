import mongoose from "mongoose";

import Product from "./Product";
import Comment from "./Comment";
import Notification from "./Notification";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    provider: { type: String, required: true },

    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
