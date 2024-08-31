import connectToDb from "@/config/db";
import Comment from "@/models/Comment";

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

    const comments = await Comment.find({ user: user._id })
      .populate("product", "name slug")
      .sort({
        createdAt: -1,
      });

    return Response.json(comments);
  } catch (error) {
    console.log("Error while getting comments : ", error);
    return Response.json(
      { msg: "خطای سرور !" },
      {
        status: 500,
      },
    );
  }
};
