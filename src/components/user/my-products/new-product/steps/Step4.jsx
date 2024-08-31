"use client";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

const Step4 = ({
  formData,
  categories,
  thumbnail,
  gallery,
  video,
  pricing,
  prevStep,
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const completeData = {
    ...formData,
    categories,
    thumbnail,
    gallery,
    video,
    pricing,
  };

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/products", {
        data: {
          ...completeData,
          categories: categories.map((cat) => cat.english),
        },
      });
    },
    onSuccess: () => {
      toast.success("محصول با موفقیت ثبت شد", {
        description:
          "محصول شما با موفقیت ثبت شد و در حالت انتظار برای تایید قرار گرفت",
      });
      queryClient.invalidateQueries(["myProducts"]).then(() => {
        router.push("/my-products");
        router.refresh();
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg);
    },
  });

  return (
    <div className="space-y-7">
      <h3 className="text-xl font-bold">تایید نهایی و ثبت محصول</h3>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">نام محصول : </span>
        <span className="font-semibold">{formData.name}</span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          آدرس و دامنه محصول :{" "}
        </span>
        <span className="font-semibold">{formData.url}</span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          شعار تبلیغاتی محصول :{" "}
        </span>
        <span className="font-semibold">{formData.tagline}</span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          اینستاگرام محصول :{" "}
        </span>
        <span className="font-semibold">{formData.instagram}</span>
      </div>{" "}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          لینکداین محصول :{" "}
        </span>
        <span className="font-semibold">{formData.linkedin}</span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          آدرس کد محصول :{" "}
        </span>
        <span className="text-sm leading-loose">
          {formData.sourceCodeUrl || "این محصول متن باز نیست !"}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          توضیحات محصول :{" "}
        </span>
        <p className="text-sm leading-loose">
          {formData.description || "این محصول فاقد توضیح است !"}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          اولین کامنت محصول :{" "}
        </span>
        <p className="text-sm leading-loose">{formData.firstComment}</p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          دسته بندی های محصول :{" "}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <span
              key={cat.english}
              className={`cursor-pointer rounded-lg bg-base-200 p-2 text-xs font-bold transition hover:scale-105`}
            >
              {cat.persian}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-sm font-bold text-gray-500">
          تصویر بند انگشتی محصول :{" "}
        </span>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-base-300 text-sm font-bold text-base-300">
            لوگو
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">تصاویر محصول : </span>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {gallery.map((img, index) => (
            <img key={index} src={img} alt="Product image" className="h-full w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">ویدیو محصول : </span>
        {video && (
          <iframe src={video} className="h-[300px] w-full rounded-lg"></iframe>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-500">
          قیمت و نحوه خدمات محصول :{" "}
        </span>
        <span className="font-semibold">
          {pricing === "Free"
            ? "رایگان"
            : pricing === "Paid"
              ? "غیر رایگان"
              : "اشتراکی"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={prevStep} className="btn btn-outline">
          مرحله قبلی
        </button>
        <button
          disabled={mutation.isPending}
          className="btn btn-secondary"
          onClick={() => mutation.mutate()}
        >
          تایید نهایی و ثبت محصول{" "}
        </button>
      </div>
    </div>
  );
};

export default Step4;
