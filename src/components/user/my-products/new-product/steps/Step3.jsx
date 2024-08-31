"use client";

const Step3 = ({ pricing, setPricing, prevStep, nextStep }) => {
  return (
    <div className="space-y-5 text-lg font-bold">
      <h3 className="!text-xl font-bold">نحوه ارائه خدمت و قیمت محصول </h3>
      <p className="!text-sm !leading-loose text-gray-500">
        از اونجایی که قیمت و اشتراک هر پلتفرم برای کاربران مهم است لطفا در
        انتخاب گزینه ها دقت نمایید !
      </p>
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="radio"
            name="pricing"
            className="radio checked:bg-red-500"
            onChange={() => setPricing("Free")}
            checked={pricing === "Free"}
          />
          <div className="space-y-1">
            <span className="label-text">رایگان </span>
            <p className="!text-xs leading-loose text-gray-500">
              این گزینه به این معناست که پلتفرم شما کاملا رایگان بوده .
            </p>
          </div>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="radio"
            name="pricing"
            className="radio checked:bg-blue-500"
            onChange={() => setPricing("Paid")}
            checked={pricing === "Paid"}
          />
          <div className="space-y-1">
            <span className="label-text">غیر رایگان</span>
            <p className="!text-xs !leading-loose text-gray-500">
              این گزینه به این معناست که پلتفرم شما کاملا غیر رایگان بوده و
              کاربر برای استفاده از سرویس باید هزینه ای پرداخت کند !
            </p>
          </div>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="radio"
            name="pricing"
            className="radio checked:bg-blue-500"
            onChange={() => setPricing("Subscription")}
            checked={pricing === "Subscription"}
          />
          <div className="space-y-1">
            <span className="label-text">رایگان ولی دارای اشتراک</span>
            <p className="!text-xs !leading-loose text-gray-500">
              این گزینه به این معناست که پلتفرم شما تا حدودی رایگان بوده و برای
              بهره مندی از امکانات بیشتر بایستی اشتراک تهیه نمود .
            </p>
          </div>
        </label>
      </div>
      <div className="flex justify-between">
        <button className="btn btn-outline" onClick={prevStep}>
          مرحله قبل
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default Step3;
