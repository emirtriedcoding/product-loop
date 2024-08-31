import connectToDb from "@/config/db";
import Notification from "@/models/Notification";

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

    const notifications = await Notification.find({ user: user._id })
      .populate("product", "name slug createdAt")
      .sort({ createdAt: -1 });

    return Response.json(notifications);
  } catch (error) {
    console.log("Error while getting the notifications : ", error);
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

export const PUT = async () => {
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

    await Notification.updateMany(
      {
        user: user._id,
      },
      {
        read: true,
      },
    );

    return Response.json({
      msg: "Success",
    });
  } catch (error) {
    console.log("Error while reading the notfications : ", error);
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
