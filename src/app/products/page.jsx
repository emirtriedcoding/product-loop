import connectToDb from "@/config/db";
import Product from "@/models/Product";

import Products from "@/components/products/Products";

const ProductsPage = async () => {
  connectToDb();

  const products = await Product.find({ status: "Approved" }).sort({
    createdAt: -1,
  });

  return <Products products={products} />;
};

export default ProductsPage;
