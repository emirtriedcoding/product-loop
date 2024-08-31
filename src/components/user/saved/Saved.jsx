"use client";

import Link from "next/link";

import axios from "axios";

import Loader from "@/components/loader/Loader";

import { useQuery } from "@tanstack/react-query";

const Saved = () => {
  const { data: saved, isLoading } = useQuery({
    queryKey: ["saved"],
    queryFn: async () => {
      return axios.get("/api/user/saved").then((res) => res.data);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8 px-10 h-screen">
      <h2 className="text-lg font-bold">ذخیره شده ها : </h2>
      {saved.length ? (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-8">
          {saved.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              className="flex flex-col items-center gap-5 rounded-lg bg-base-100 p-5 shadow-md transition hover:scale-105"
            >
              <img
                src={product.thumbnail}
                className="h-10 w-10 rounded-full"
                alt="Product Thumbnail"
              />
              <p className="text-xs font-bold">{product.name}</p>
              <p className="text-center text-xs font-semibold leading-loose">
                {product.tagline}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <p className="text-xl font-bold">فعلا اینجا هیچ خبری نیست !</p>
          <Link href={"/products"} className="btn btn-secondary w-full">
            مشاهده محصولات
          </Link>
        </div>
      )}
    </div>
  );
};

export default Saved;
