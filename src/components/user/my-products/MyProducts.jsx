"use client";

import Link from "next/link";
import axios from "axios";

import Loader from "@/components/loader/Loader";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { Edit3, Trash2 } from "lucide-react";

const MyProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      return axios.get("/api/user/my-products").then((res) => res.data);
    },
  });

  if (isLoading) return <Loader />;

  const pendingProducts = products?.filter(
    (product) => product.status === "Pending",
  );
  const approvedProducts = products?.filter(
    (product) => product.status === "Approved",
  );
  const rejectedProducts = products?.filter(
    (product) => product.status === "Rejected",
  );

  return (
    <div className="min-h-[900px] space-y-5 p-5">
      <h2 className="text-center text-xl font-bold">محصولات من : </h2>
      <span className="divider mx-auto max-w-lg"></span>
      <div className="tabs tabs-lifted">
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="همه"
          defaultChecked
        />
        <div className="tab-content space-y-5 rounded-box border-base-300 bg-base-100 p-5">
          {products.length ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center font-bold">
              محصولی جهت نمایش وجود ندارد !
            </p>
          )}
        </div>
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="بررسی"
        />
        <div
          role="tabpanel"
          className="tab-content space-y-5 rounded-box border-base-300 bg-base-100 p-5"
        >
          {pendingProducts.length ? (
            pendingProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center font-bold">
              محصولی جهت نمایش وجود ندارد !
            </p>
          )}
        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="تایید"
        />
        <div
          role="tabpanel"
          className="tab-content space-y-5 rounded-box border-base-300 bg-base-100 p-5"
        >
          {approvedProducts.length ? (
            approvedProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center font-bold">
              محصولی جهت نمایش وجود ندارد !
            </p>
          )}
        </div>
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="رد"
        />
        <div
          role="tabpanel"
          className="tab-content space-y-5 rounded-box border-base-300 bg-base-100 p-5"
        >
          {rejectedProducts.length ? (
            rejectedProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center font-bold">
              محصولی جهت نمایش وجود ندارد !
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Product = ({ product }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId) => {
      return axios.delete(`/api/user/my-products/${productId}`);
    },
    onSuccess: () => {
      toast.success("محصول با موفقیت حذف شد");
      return queryClient.invalidateQueries(["myProducts"]);
    },
  });

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body items-center justify-between gap-6 lg:!flex-row">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <img
            src={product.thumbnail}
            alt="Product Thumbnail"
            className="h-12 w-12 rounded-xl lg:h-24 lg:w-24"
          />
          <div className="flex flex-col items-center lg:items-start gap-3">
            <Link href={`/products/${product.slug}`}>
              <h6 className="text-lg font-bold text-info">{product.name}</h6>
            </Link>
            <p className="text-sm font-semibold text-gray-500 text-center leading-loose">
              {product.tagline}
            </p>
            <p className="!mt-3 text-xs font-semibold">
              وضعیت :{" "}
              <span
                className={`rounded-xl p-2 ${product.status === "Pending" ? "bg-orange-200 text-orange-400" : product.status === "Approved" ? "bg-emerald-200 text-emerald-400" : "bg-rose-200 text-rose-400"}`}
              >
                {product.status === "Pending" && "در حال بررسی"}
                {product.status === "Approved" && "تایید شده"}
                {product.status === "Rejected" && "رد شده"}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="tooltip" data-tip="حذف محصول">
            <button
              onClick={() =>
                document.getElementById("delete_modal").showModal()
              }
              className="btn btn-error !text-white"
            >
              <Trash2 strokeWidth={1.5} />
            </button>
          </div>
          <div className="tooltip" data-tip="ویرایش محصول">
            <Link
              href={`/my-products/edit/${product._id}`}
              className="btn !bg-warning !text-white"
            >
              <Edit3 strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">آیا اطمینان کامل دارید ؟</h3>
          <p className="py-4 text-center text-[13px] font-semibold leading-loose text-error">
            با انجام این عملیات محصول شما و کلیه اطلاعات و دیتای آن از جمله
            نظرات تعداد پسند ها و ... به صورت کامل از بین خواهند رفت و هرگز قابل
            بازگشت نخواهند بود !
          </p>
          <button
            onClick={() => mutation.mutate(product._id)}
            disabled={mutation.isPending}
            className="btn btn-error w-full"
          >
            تایید و حذف
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyProducts;
