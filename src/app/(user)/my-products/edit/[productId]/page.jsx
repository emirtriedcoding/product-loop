import EditProduct from "@/components/user/my-products/EditProduct";

import connectToDb from "@/config/db";
import Product from "@/models/Product";

import { authUser } from "@/lib/helpers";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";

export const metadata = {
  title: "حساب کاربری - ویرایش محصول",
};

const EditProductPage = async ({ params }) => {
  const { productId } = params;

  const user = await authUser();

  connectToDb();

  if (!isValidObjectId(productId)) {
    return redirect("/my-products");
  }

  const product = await Product.findById(productId);

  if (!product) return redirect("/my-products");

  if (product.user.toString() !== user._id.toString()) {
    return redirect("/my-products");
  }

  return <EditProduct product={JSON.parse(JSON.stringify(product))} />;
};

export default EditProductPage;
