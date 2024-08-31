import connectToDb from "@/config/db";
import Product from "@/models/Product";

import Products from "@/components/products/Products";


const HomePage = async () => {
  connectToDb();

  const products = await Product.find({ status: "Approved" }).sort({
    upvotes: -1,
  }).limit(10);

  return <Products products={products} isReview={true} />;
};

export default HomePage;
