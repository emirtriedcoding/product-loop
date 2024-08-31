"use client";

import { categories } from "@/lib/constants";

import { toast } from "sonner";

const Step1 = ({
  register,
  errors,
  selectedCategories,
  setSelectedCategories,
  handleSubmit,
  setFormData,
  nextStep,
}) => {
  const handleSelectCategory = (cat) => {
    if (selectedCategories.some((c) => c.english === cat.english)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.english !== cat.english),
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        {
          persian: cat.persian,
          english: cat.english,
        },
      ]);
    }
  };

  const onSubmit = (data) => {
    if (selectedCategories.length < 1) {
      return toast.error("لطفا حداقل یک مورد دسته بندی انتخاب نمایید !");
    }
    setFormData(data);
    nextStep();
  };

  return (
    <>
      <h2 className="text-xl font-bold">ایجاد و ثبت محصول جدید </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">
              آدرس پلتفرم شما یا همان دامنه
            </span>
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
            <span className="label-text font-semibold">نام محصول</span>
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="نام محصول"
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
            <span className="label-text font-semibold">نام انگلیسی محصول</span>
          </div>
          <input
            {...register("englishName")}
            type="text"
            placeholder="برای مثال Persian Launch"
            className="input input-bordered w-full placeholder:text-sm"
          />
          {errors.englishName && (
            <p className="!mt-3 mr-2 text-xs font-semibold text-error">
              {errors.englishName.message}
            </p>
          )}
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">شعار تبلیغاتی</span>
          </div>
          <input
            {...register("tagline")}
            type="text"
            placeholder="شعار تبلیغاتی محصول"
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
            <span className="label-text font-semibold">اینستاگرام محصول</span>
          </div>
          <input
            {...register("instagram")}
            type="text"
            placeholder="emirtriedcoding"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">لینکداین محصول </span>
          </div>
          <input
            {...register("linkedin")}
            type="text"
            placeholder="amirhossein"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">لینک گیت هاب پروژه</span>
          </div>
          <p className="!my-2 text-xs font-semibold leading-loose text-gray-500">
            لطفا دقت داشته باشید اگر محصول شما به صورت متن باز است این فیلد را
            پر نمایید در غیر این صورت نیازی نیست و پر کردن آن به معنای متن باز
            بودن پروژه و محصول شماست !
          </p>
          <input
            {...register("sourceCodeUrl")}
            type="text"
            placeholder="amirhossein"
            className="input input-bordered w-full placeholder:text-sm"
          />
        </label>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">توضیحات محصول</span>
          </div>
          <textarea
            {...register("description")}
            type="text"
            placeholder="توضیحاتی مختصر راجب کارایی محصول شما ..."
            className="textarea textarea-bordered w-full placeholder:text-sm"
            rows={5}
          />
          {errors.description && (
            <p className="!mt-3 mr-2 text-xs font-semibold text-error">
              {errors.description.message}
            </p>
          )}
        </label>
        <h3 className="text-lg font-bold">دسته بندی ها - حداقل یک مورد</h3>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <span
              onClick={() => handleSelectCategory(cat)}
              key={cat.english}
              className={`cursor-pointer rounded-lg bg-base-200 p-2 text-xs font-bold transition hover:scale-105 ${selectedCategories.some((c) => c.english === cat.english) ? "bg-primary !text-white" : ""}`}
            >
              {cat.persian}
            </span>
          ))}
        </div>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">اولین کامنت محصول</span>
          </div>
          <textarea
            {...register("firstComment")}
            type="text"
            placeholder="اولین کامنت محصولت خود باش ..."
            className="textarea textarea-bordered w-full placeholder:text-sm"
            rows={7}
          />
        </label>
        <button type="submit" className="btn btn-primary w-full">
          مرحله بعد
        </button>
      </form>
    </>
  );
};

export default Step1;
