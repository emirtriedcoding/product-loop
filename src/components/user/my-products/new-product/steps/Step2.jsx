"use client";

import Uploader from "@/components/uploader/Uploader";

const Step2 = ({
  thumbnail,
  setThumbnail,
  gallery,
  setGallery,
  video,
  setVideo,
  prevStep,
  nextStep,
}) => {
  return (
    <>
      <h1 className="text-xl font-bold">تصاویر و ویدیو</h1>
      <div className="mt-4 space-y-5">
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">تصویر بند انگشتی</span>
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

        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">گالری تصاویر</span>
          </div>
          <Uploader onUpload={(files) => setGallery(files)} multiple />
        </label>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {gallery.map((img) => (
            <img
              key={img}
              src={img}
              alt="img"
              className="h-full w-full rounded-lg object-cover"
            />
          ))}
        </div>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">آدرس ویدیوی محصول</span>
          </div>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            placeholder="https://www.aparat.com/v/123456"
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex justify-between">
          <button className="btn btn-outline" onClick={prevStep}>
            مرحله قبل
          </button>
          <button className="btn btn-primary" onClick={nextStep}>
            مرحله بعد
          </button>
        </div>
      </div>
    </>
  );
};

export default Step2;
