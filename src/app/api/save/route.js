import { authUser } from "@/lib/helpers";

import { isValidObjectId } from "mongoose";

export const PUT = async (req) => {
  const user = await authUser();
  
  try {
    if (!user) {
      return Response.json(
        { msg: "ابتدا وارد شوید !" },
        {
          status: 401,
        },
      );
    }

    const { productId } = await req.json();

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

    if (user.saved.some((p) => p._id.toString() === productId)) {
      user.saved.pull(productId);
      await user.save();
      return Response.json({
        msg: "محصول  با موفقیت از لیست ذخیره شده ها حذف گردید !",
      });
    } else {
      user.saved.push(productId);
      await user.save();
      return Response.json({
        msg: "محصول با موفقیت به لیست ذخیره شده ها اضافه شد !",
      });
    }
  } catch (error) {
    console.log("Error while saving the product : ", error);
    return Response.json(
      {
        msg: "خطای سرور",
      },
      {
        status: 500,
      },
    );
  }
};
