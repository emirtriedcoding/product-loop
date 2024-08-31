import mongoose from "mongoose";

import User from "./User";
import Comment from "./Comment";

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    firstComment: { type: String, defualt: "" },
    sourceCodeUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    categories: [{ type: String, required: true }],
    thumbnail: { type: String, default: "" },
    gallery: [{ type: String, default: [] }],
    video: { type: String, default: "" },
    pricing: {
      type: String,
      enum: ["Free", "Paid", "Subscription"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;
