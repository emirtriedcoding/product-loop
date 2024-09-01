"use client";

import Uploader from "@/components/uploader/Uploader";

import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { categories } from "@/lib/constants";

import { toast } from "sonner";

const EditProduct = ({ product }) => {
  const router = useRouter();
  
  const schema = z.object({
    url: z.string().url({ message: "آدرس محصول نامعتبر میباشد !" }),
    name: z
      .string()
      .min(3, { message: "نام محصول باید حداقل 3 کاراکتر باشد !" })
      .max(20, {
        message: "نام محصول نمیتواند بیشتر از 20 کاراکتر باشد !",
      }),
    tagline: z
      .string()
      .min(1, { message: "شعار تبلیغاتی الزامیست !" })
      .max(50, {
        message: "شعار تبلیغاتی نمیتواند بیشتر از 50 کاراکتر باشد !",
      }),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    sourceCodeUrl: z.string().optional(),
    description: z
      .string()
      .max(260, {
        message: "توضیحات محصول نمیتواند بیشتر از 260 کاراکتر باشد !",
      })
      .optional(),
  });

  const mutation = useMutation({
    mutationFn: async (updatedProduct) => {
      return axios.put(`/api/user/my-products/${product._id}`, {
        updatedProduct,
      });
    },
    onSuccess: () => {
      toast.success("محصول با موفقیت ویرایش شد !");
      router.push("/my-products");
      router.refresh();
    },
  });

  const [selectedCategories, setSelectedCategories] = useState(
    product.categories || [],
  );

  const [thumbnail, setThumbnail] = useState(product.thumbnail || "");
  const [gallery, setGallery] = useState(product.gallery || []);
  const [video, setVideo] = useState(product.video || "");

  const [pricing, setPricing] = useState(product.pricing || "Free");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: product.url,
      name: product.name,
      tagline: product.tagline,
      instagram: product.instagram,
      linkedin: product.linkedin,
      sourceCodeUrl: product.sourceCodeUrl,
      description: product.description,
    },
  });

  const onSubmit = (data) => {
    if (selectedCategories.length < 1) {
      return toast.error("لطفا حداقل یک مورد دسته بندی انتخاب نمایید !");
    }

    const updatedProduct = {
      ...data,
      categories: selectedCategories,
      thumbnail,
      gallery,
      video,
      pricing,
    };

    mutation.mutate(updatedProduct);
  };

  const handleSelectCategory = (cat) => {
    if (selectedCategories.includes(cat.english)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat.english));
    } else {
      setSelectedCategories([...selectedCategories, cat.english]);
    }
  };

  return (
    <div className="mx-auto space-y-5 p-5 lg:max-w-4xl">
      <h2 className="text-center text-xl font-bold">ویرایش محصول : </h2>
      <p className="text-center text-xs leading-loose text-gray-500 lg:text-sm">
        لطفا در نظر داشته باشید که با هر بار ویرایش محصول به حالت بررسی رفته و
        بعد از بررسی توسط کارشناسان در وبسایت قرار میگیرد !
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">آدرس محصول :</span>
          </div>
          <input
            {...register("url")}
            type="text"
            placeholder="برای مثال persianlaunch.ir"
            className="input input-bordered w-full placeholder:text-sm"
          />
          {errors.url && (
            <p className="!mt-3 mr-2 text-xs font-semibold text-error">
              {errors.url.message}
            </p>
          )}
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">نام محصول :</span>
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="برای مثال Persian Launch"
            className="input input-bordered w-full placeholder:text-sm"
          />
          {errors.name && (
            <p className="!mt-3 mr-2 text-xs font-semibold text-error">
              {errors.name.message}
            </p>
          )}
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">
              شعار تبلیغاتی محصول :
            </span>
          </div>
          <input
            {...register("tagline")}
            type="text"
            placeholder="اینجا بنویسید"
            className="input input-bordered w-full placeholder:text-sm"
          />
          {errors.tagline && (
            <p className="!mt-3 mr-2 text-xs font-semibold text-error">
              {errors.tagline.message}
            </p>
          )}
        </label>
        <span className="divider"></span>
        <h3 className="text-lg font-bold">لینک ها</h3>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">اینستاگرام محصول :</span>
          </div>
          <input
            {...register("instagram")}
            type="text"
            placeholder="برای مثال emirtriedcoding"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">لینکداین محصول :</span>
          </div>
          <input
            {...register("linkedin")}
            type="text"
            placeholder="برای مثال emirtriedcoding"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">
              لینک گیت هاب پروژه :
            </span>
          </div>
          <p className="!my-2 text-xs font-semibold leading-loose text-gray-500">
            لطفا دقت داشته باشید اگر محصول شما به صورت متن باز است این فیلد را
            پر نمایید در غیر این صورت نیازی نیست و پر کردن آن به معنای متن باز
            بودن پروژه و محصول شماست!
          </p>
          <input
            {...register("sourceCodeUrl")}
            type="text"
            placeholder="برای مثال https://github.com/emirtriedcoding"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">توضیحات محصول :</span>
          </div>
          <textarea
            {...register("description")}
            type="text"
            placeholder="توضیحاتی مختصر راجب کارایی محصول شما ..."
            className="textarea textarea-bordered w-full placeholder:text-sm"
            rows={5}
          />
        </label>

        <span className="divider"></span>
        <h3 className="text-lg font-bold">دسته بندی ها - حداقل یک مورد</h3>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <span
              onClick={() => handleSelectCategory(cat)}
              key={cat.english}
              className={`cursor-pointer rounded-lg bg-base-200 p-2 text-xs font-bold transition hover:scale-105 ${
                selectedCategories.includes(cat.english)
                  ? "bg-primary !text-white"
                  : ""
              }`}
            >
              {cat.persian}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold">تصاویر و ویدیو</h3>
        <label className="form-control space-y-3">
          <div className="label">
            <span className="label-text font-semibold">تصویر بند انگشتی :</span>
          </div>
          <div className="flex flex-col items-center gap-3 lg:flex-row">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="thumbnail"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-base-300 text-sm font-bold text-base-300">
                لوگو
              </div>
            )}
            <Uploader onUpload={(file) => setThumbnail(file[0])} />
          </div>
        </label>
        <label className="form-control space-y-6">
          <div className="label">
            <span className="label-text font-semibold">گالری تصاویر :</span>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {gallery.map((img , index) => (
              <img
              key={index}
                src={img}
                alt="thumbnail"
                className="h-full w-full rounded-xl object-cover"
              />
            ))}
          </div>
          <Uploader onUpload={(files) => setGallery(files)} multiple />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">
              لینک ویدیو محصول ( Iframe ) :{" "}
            </span>
          </div>
          <input
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            type="text"
            placeholder="اینجا بنویسید"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <span className="divider"></span>
        <h3 className="text-lg font-bold">قیمت</h3>
        <select
          className="select select-bordered w-full"
          value={pricing}
          onChange={(e) => setPricing(e.target.value)}
        >
          <option value="Free">رایگان</option>
          <option value="Paid">غیر رایگان</option>
          <option value="Subscription">اشتراکی</option>
        </select>
        <button
          disabled={mutation.isPending}
          type="submit"
          className="btn btn-primary mt-5 w-full"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
