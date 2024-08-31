import connectToDb from "@/config/db";
import Product from "@/models/Product";

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

    const products = await Product.find(
      { user: user._id },
      "name tagline status thumbnail slug",
    ).sort({
      createdAt: -1,
    });

    return Response.json(products);
  } catch (error) {
    console.log("Error while getting user products : ", error);
    return Response.json(
      { msg: "خطای سرور !" },
      {
        status: 500,
      },
    );
  }
};
