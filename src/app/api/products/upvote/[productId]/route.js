import connectToDb from "@/config/db";
import Product from "@/models/Product";

import { authUser } from "@/lib/helpers";
import { isValidObjectId } from "mongoose";

export const PUT = async (req, { params }) => {
  const user = await authUser();
  
  try {
    if (!user) {
      return Response.json(
        {
          msg: "ابتدا وارد شوید !",
        },
        {
          status: 401,
        },
      );
    }

    const { productId } = params;

    if (!isValidObjectId(productId)) {
      return Response.json(
        {
          msg: "درخواست نامعتبر !",
        },
        {
          status: 400,
        },
      );
    }

    connectToDb();

    // TODO: check if user already upvoted this product
    const product = await Product.findById(productId);

    if (!product) {
      return Response.json(
        {
          msg: "محصولی با این شناسه وجود ندارد !",
        },
        {
          status: 404,
        },
      );
    }

    if (product.upvotes.includes(user._id)) {
      product.upvotes.pull(user._id);
    } else {
      product.upvotes.push(user._id);
    }

    await product.save();

    return Response.json({
      msg: "عملیات با موفقیت انجام شد !",
    });
  } catch (error) {
    console.log("Error while upvoting product : ", error);
    return Response.json(
      {
        msg: "خطای سرور !",
      },
      {
        status: 500,
      },
    );
  }
};
