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

    return Response.json(user.saved);
  } catch (error) {
    console.log("Error while getting saved items from DB : ", error);
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
