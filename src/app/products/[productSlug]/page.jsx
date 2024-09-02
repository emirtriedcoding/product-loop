import connectToDb from "@/config/db";

import ProductModel from "@/models/Product";

import SingleProduct from "@/components/products/Product";

import { authUser } from "@/lib/helpers";

import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { productSlug } = params;

  connectToDb();

  const product = await ProductModel.findOne(
    { slug: productSlug },
    "name tagline images slug",
  ).lean();

  if (!product) {
    return {
      title: "محصولی پیدا نشد",
      description: "محصول مورد نظر پیدا نشد.",
    };
  }

  const siteUrl = "https://productloop.ir";
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const productImage = product.thumbnail || "/assets/avatar.png"

  return {
    title: `پروداکت لوپ - ${product.name}`,
    description: product.tagline,
    openGraph: {
      title: `پروداکت لوپ - ${product.name}`,
      description: product.tagline,
      url: productUrl,
      type: "article",
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `پروداکت لوپ - ${product.name}`,
      description: product.tagline,
      image: productImage,
    },
  };
};

const Product = async ({ params }) => {
  connectToDb();

  const { productSlug } = params;

  const product = await ProductModel.findOne({ slug: productSlug })
    .populate("user")
    .populate({
      path: "upvotes",
      select: "name email image _id",
    })
    .populate({
      path: "comments",
      populate: [
        {
          path: "user", // Populate the user who made the comment
        },
        {
          path: "replies", // Populate the replies for each comment
          populate: {
            path: "user", // Populate the user who made the reply
          },
        },
      ],
      options: { sort: { createdAt: -1 } },
    })
    .lean();

  if (!product) return notFound();

  if (product.status === "Pending" || product.status === "Rejected")
    return notFound();

  const products = await ProductModel.find({}).sort({ upvotes: -1 }).lean();

  const rank =
    products.findIndex((p) => p._id.toString() === product._id.toString()) + 1;

  const user = await authUser();

  return (
    <SingleProduct
      product={JSON.parse(JSON.stringify(product))}
      user={JSON.parse(JSON.stringify(user))}
      rank={rank}
    />
  );
};

export default Product;
