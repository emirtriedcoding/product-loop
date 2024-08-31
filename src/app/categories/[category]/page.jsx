import connectToDb from "@/config/db";
import Product from "@/models/Product";

import Products from "@/components/products/Products";

import { categories } from "@/lib/constants";

export const generateMetadata = ({ params }) => {
  const { category } = params;

  const categoryNameInPersian = categories.find(
    (cat) => cat.english === category,
  )?.persian;

  return {
    title: `دسته بندی ${categoryNameInPersian}`,
  };
};

const CategoryPage = async ({ params }) => {
  const { category } = params;

  connectToDb();

  const products = await Product.find({
    categories: { $in: category },
    status: "Approved",
  }).sort({
    createdAt: -1,
  });

  return <Products products={JSON.parse(JSON.stringify(products))} />;
};

export default CategoryPage;
