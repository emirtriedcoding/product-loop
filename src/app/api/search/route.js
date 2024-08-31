import connectToDb from "@/config/db";

import Product from "@/models/Product";

export const GET = async (req) => {
  try {
    const q = req.nextUrl.searchParams.get("q");

    connectToDb();

    const results = await Product.find({
      name: { $regex: new RegExp(q, "i") }, // Case-insensitive search
    }).limit(10);

    return Response.json(results);
  } catch (error) {
    return Response.json({ msg: "خطای سرور !" }, { status: 500 });
    console.log("Error while searching products : ", error);
  }
};
