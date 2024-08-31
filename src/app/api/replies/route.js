import connectToDb from "@/config/db";

import Comment from "@/models/Comment";
import Notification from "@/models/Notification";
import Reply from "@/models/Reply";

import { authUser } from "@/lib/helpers";
import { isValidObjectId } from "mongoose";

export const POST = async (req) => {
  const user = await authUser();
  
  try {
    if (!user) {
      return new Response("ابتدا وارد شوید !", { status: 401 });
    }

    const { body, commentId } = await req.json();

    if (!isValidObjectId(commentId)) {
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

    const newReply = await Reply.create({
      body,
      comment: commentId,
      user: user._id,
    });

    const comment = await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: newReply._id },
    });

    if (newReply.user.toString() !== comment.user.toString()) {
      await Notification.create({
        subject: "کاربری بر نظر شما پاسخی ثبت کرد !",
        message: newReply.body,
        type: "Reply",
        product: comment.product,
        user: comment.user,
      });
    }

    return Response.json(
      { msg: "ثبت شد" },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Error while adding reply : ", error);
    return Response.json(
      { msg: "خطای سرور" },
      {
        status: 500,
      },
    );
  }
};
