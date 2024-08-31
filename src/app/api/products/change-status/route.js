import connectToDb from "@/config/db";

import Notification from "@/models/Notification";
import Product from "@/models/Product";

export const PUT = async (req) => {
  try {
    const { productId, status, secret , message } = await req.json();

    if (secret !== process.env.SECRET) {
      return Response.json(
        {
          msg: "دسترسی غیر مجاز !",
        },
        {
          status: 403,
        },
      );
    }

    connectToDb();

    const product = await Product.findByIdAndUpdate(productId, { status });

    await Notification.create({
      subject: `محصول شما ${status === "Approved" ? "تایید" : "رد"} شد`,
      message ,
      type: "Status",
      user: product.user,
      product: product._id,
    });

    return Response.json({
      msg: "وضعیت محصول با موفقیت تغییر کرد !",
    });
  } catch (error) {
    console.log("Error while changing status of product : ", error);
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
