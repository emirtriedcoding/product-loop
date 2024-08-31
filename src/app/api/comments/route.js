import connectToDb from "@/config/db";

import Comment from "@/models/Comment";
import Notification from "@/models/Notification";
import Product from "@/models/Product";

import { authUser } from "@/lib/helpers";

import { isValidObjectId } from "mongoose";

export const POST = async (req) => {
  const user = await authUser();

  try {

    if (!user) {
      return Response.json(
        { msg: "برای ثبت نظر باید وارد شوید" },
        {
          status: 401,
        },
      );
    }

    const { productId, comment } = await req.json();

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

    const newComment = await Comment.create({
      body: comment,
      user: user._id,
      product: productId,
    });

    const product = await Product.findByIdAndUpdate(productId, {
      $push: {
        comments: newComment._id,
      },
    });

    user.comments.push(newComment._id);

    await user.save();

    if (newComment.user.toString() !== product.user.toString()) {
      await Notification.create({
        subject: "نظر جدیدی بر روی محصول شما ثبت گردید !",
        message: `نظر جدیدی توسط کاربر ${user.name} بر روی محصول شما ثبت گردید .`,
        type: "Comment",
        user: product.user,
        product: product._id,
      });
    }

    return Response.json(
      {
        msg: "کامنت با موفقیت ثبت گردید !",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Error while creating new comment : ", error);
    return Response.json(
      { msg: "خطای سرور" },
      {
        status: 500,
      },
    );
  }
};

export const PUT = async (req) => {
  const user = await authUser();

  try {

    if (!user) {
      return Response.json(
        { msg: "برای لایک کامنت ابتدا باید وارد شوید !" },
        {
          status: 401,
        },
      );
    }

    const { commentId } = await req.json();


    if(!isValidObjectId(commentId)){
      return Response.json(
        { msg: "درخواست نامعتبر !" },
        {
          status: 400,
        },
      );
    }

    connectToDb();

    const comment = await Comment.findById(commentId);

    /// check if the user id is already exist pull it from likes array and if its not push it
    if (comment.likes.includes(user._id)) {
      comment.likes.pull(user._id);
      await comment.save();
      return Response.json({
        msg: "کامنت آنلایک شد !",
      });
    } else {
      comment.likes.push(user._id);
      await comment.save();
      if (user._id.toString() !== comment.user.toString()) {
        await Notification.create({
          subject: "کامنت شما توسط یک کاربر لایک شد !",
          message: `نظر شما توسط کاربر ${user.name} لایک شد !`,
          type: "Like",
          product: comment.product,
          user: comment.user,
        });
      }
      return Response.json({
        msg: "کامنت لایک شد !",
      });
    }
  } catch (error) {
    console.log("Error while liking the comment : ", error);
    return Response.json(
      { msg: "خطای سرور" },
      {
        status: 500,
      },
    );
  }
};
