import connectToDb from "@/config/db";

import Product from "@/models/Product";
import Comment from "@/models/Comment";
import Reply from "@/models/Reply";
import Notification from "@/models/Notification";
import User from "@/models/User";

import { authUser } from "@/lib/helpers";

export const GET = async () => {
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

    connectToDb();

    await Notification.deleteMany({ user: user._id });

    await Comment.deleteMany({ user: user._id });

    await Reply.deleteMany({ user: user._id });

    const products = await Product.find({ user: user._id });

    await Comment.deleteMany({
      product: { $in: products.map((product) => product._id) },
    });

    await Reply.deleteMany({
      product: { $in: products.map((product) => product._id) },
    });

    await Product.deleteMany({ user: user._id });

    await User.findByIdAndDelete(user._id);

    return Response.json(
      {
        msg: "حساب کاربری با موفقیت حذف شد.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Error while deleting account: ", error);
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
