import connectToDb from "@/config/db";

import Comment from "@/models/Comment";
import Product from "@/models/Product";
import Reply from "@/models/Reply";

import { authUser } from "@/lib/helpers";

export const DELETE = async (req, { params }) => {
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

    connectToDb();

    const product = await Product.findById(productId);

    if (!product) {
      return Response.json(
        {
          msg: "محصولی یافت نشد !",
        },
        {
          status: 404,
        },
      );
    }

    if (product.user.toString() !== user._id.toString()) {
      return Response.json(
        {
          msg: "شما مجاز به حذف این محصول نیستید !",
        },
        {
          status: 403,
        },
      );
    }

    user.products.pull(product._id);
    await user.save();

    await Comment.deleteMany({ product: product._id });

    await Reply.deleteMany({ comment: { $in: product.comments } });

    await Product.findByIdAndDelete(product._id);

    return Response.json({ msg: "محصول با موفقیت حذف شد !" });
  } catch (error) {
    console.log("Error while deleting product : ", error);
    return Response.json(
      { msg: "خطای سرور !" },
      {
        status: 500,
      },
    );
  }
};

export const PUT = async (req, { params }) => {
  const user = await authUser();

  try {
    if (!user) {
      return Response.json(
        {
          msg: "برای دسترسی به این بخش باید ابتدا وارد شوید !",
        },
        {
          status: 401,
        },
      );
    }

    const { productId } = params;

    const { updatedProduct } = await req.json();

    const {
      url,
      name,
      tagline,
      instagram,
      linkedin,
      sourceCodeUrl,
      description,
      categories,
      thumbnail,
      gallery,
      video,
      pricing,
    } = updatedProduct;

    const product = await Product.findById(productId);

    if (!product) {
      return Response.json(
        {
          msg: "محصول مورد نظر یافت نشد !",
        },
        {
          status: 404,
        },
      );
    }

    if (product.user.toString() !== user._id.toString()) {
      return Response.json(
        {
          msg: "شما مجاز به ویرایش این محصول نیستید !",
        },
        {
          status: 403,
        },
      );
    }

    await Product.findByIdAndUpdate(
      product._id,
      {
        url,
        name,
        tagline,
        instagram,
        linkedin,
        sourceCodeUrl,
        description,
        categories,
        thumbnail,
        gallery,
        video,
        pricing,
        status: "Pending",
      },
      { new: true },
    );

    return Response.json({
      msg: "محصول با موفقیت ویرایش شد !",
    });
  } catch (error) {
    console.log("Error while updating product : ", error);
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
