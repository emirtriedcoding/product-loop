import connectToDb from "@/config/db";

import Feedback from "@/models/Feedback";

export const POST = async (req) => {
  try {
    const { message } = await req.json();

    connectToDb();

    await Feedback.create({
      message,
    });

    return Response.json({
      msg: "پیام با موفقیت ارسال گردید !",
    });
  } catch (error) {
    console.log("Error while sending the feedback : ", error);
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
