import connectToDb from "@/config/db";

import Notification from "@/models/Notification";
import Product from "@/models/Product";

import { authUser } from "@/lib/helpers";

export const GET = async () => {
  try {
    connectToDb();

    const products = await Product.find({})
      .populate("user")
      .populate("upvotes")
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
          },
          {
            path: "replies",
            populate: {
              path: "user",
            },
          },
        ],
      });

    return Response.json(products);
  } catch (error) {
    console.log("Error while getting products : ", error);
    return Response.json(
      { msg: "خطای سرور !" },
      {
        status: 500,
      },
    );
  }
};

export const POST = async (req) => {
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

    const { data } = await req.json();

    const {
      url,
      name,
      englishName,
      firstComment,
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
    } = data;

    if (!englishName) {
      return Response.json(
        { msg: "درخواست نامعتبر !" },
        {
          status: 400,
        },
      );
    }

    connectToDb();

    const slug = data.englishName.replace(/\s+/g, "-").toLowerCase();

    const isSlugAlreadyExist = await Product.findOne({ slug });

    if (isSlugAlreadyExist) {
      return Response.json(
        { msg: "لطفا نام انگلیسی محصول را به چیز دیگری تغییر دهید !" },
        {
          status: 400,
        },
      );
    }

    const newProduct = await Product.create({
      url,
      name,
      englishName,
      tagline,
      instagram,
      linkedin,
      firstComment,
      sourceCodeUrl,
      description,
      categories,
      thumbnail,
      gallery,
      video,
      pricing,
      slug,
      user: user._id,
    });

    user.products.push(newProduct._id);
    await user.save();

    return Response.json(
      { msg: "محصول با موفقیت ایجاد گردید !" },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Error while creating new Product : ", error);
    return Response.json(
      { msg: "خطای سرور !" },
      {
        status: 500,
      },
    );
  }
};

export const PUT = async (req) => {
  const user = await authUser();

  const { productId } = await req.json();

  try {
    if (!user) {
      return Response.json(
        {
          msg: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const product = await Product.findById(productId);

    if (product.upvotes.includes(user._id)) {
      product.upvotes.pull(user._id);
      await product.save();
      return Response.json({
        msg: "محصول با موففقیت",
      });
    } else {
      product.upvotes.push(user._id);
      await product.save();

      await Notification.create({
        subject: "کاربری محصول شما را پسندید !",
        message: `کاربر ${user.name} محصول شما را پسندید .`,
        type: "Upvote",
        user: product.user,
        product: product._id,
      });

      return Response.json({
        msg: "محصول با موففقیت",
      });
    }
  } catch (error) {
    console.log("Error while upvoting the product : ", error);
    return Response.json(
      { msg: "خطای سرور !" },
      {
        status: 500,
      },
    );
  }
};
