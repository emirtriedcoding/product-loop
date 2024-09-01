import Link from "next/link";

import Search from "@/components/search/Search";
import Upvote from "@/components/upvote/Upvote";

import { authUser } from "@/lib/helpers";
import { categories } from "@/lib/constants";

import { CornerLeftUp, MessageCircle } from "lucide-react";

const Products = async ({ isReview = false, products }) => {
  const user = await authUser();

  return (
    <div className="mx-auto h-screen max-w-sm space-y-8 p-3 lg:max-w-3xl">
      {isReview && <Search />}
      <div className="flex flex-col gap-3">
        {isReview && (
          <>
            <h1 className="text-xl lg:text-2xl font-bold">
              بهترین محصولات و پلتفرم های امروز
            </h1>
            <span className="divider"></span>
          </>
        )}
        {products.length ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between gap-5 rounded-lg border border-base-300 bg-gradient-to-bl from-neutral/5 to-transparent p-5 shadow-sm transition hover:scale-[.99]"
            >
              <div className="flex items-center gap-5">
                <img
                  src={product.thumbnail}
                  className="h-12 w-12 rounded-xl object-cover lg:h-16 lg:w-16"
                  alt={product.name}
                />
                <div className="flex w-full flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-bold text-primary text-base lg:text-lg"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs font-semibold !text-[7px] lg:text-sm">
                      {product.tagline.slice(0,10)}..
                    </p>
                    <Link
                      className="flex items-center transition hover:text-info"
                      href={`${product.url}?ref=persian-launch`}
                      target="_blank"
                    >
                      <CornerLeftUp size={18} />
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-xs">
                      <MessageCircle size={15} className="mb-0.5" />
                      <span>{product.comments.length}</span>
                    </div>
                    {product.categories.slice(0,2).map((cat) => {
                      const category = categories.find(
                        (c) => c.english === cat,
                      );
                      return (
                        category && (
                          <Link
                            key={cat}
                            href={`/categories/${category.english}`}
                            className="rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white lg:text-xs"
                          >
                            {category.persian}
                          </Link>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
              <Upvote
                product={JSON.parse(JSON.stringify(product))}
                user={JSON.parse(JSON.stringify(user))}
                isReview={true}
              />
            </div>
          ))
        ) : (
          <div className="mt-60 flex items-center justify-center text-lg font-bold">
            <p>فعلا محصولی مرتبط با این دسته بندی نداریم !</p>
          </div>
        )}
      </div>
      {isReview && (
        <Link href="/products" className="btn btn-primary w-full">
          مشاهده محصولات بیشتر
        </Link>
      )}
    </div>
  );
};

export default Products;
