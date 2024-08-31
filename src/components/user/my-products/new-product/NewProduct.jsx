"use client";

import Steps from "./steps/Steps";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";

import { CheckCircle, Coins, Image, Rocket } from "lucide-react";

const NewProductForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [formData, setFormData] = useState({});

  const [thumbnail, setThumbnail] = useState("");
  const [gallery, setGallery] = useState([]);
  const [video, setVideo] = useState("");

  const [pricing, setPricing] = useState("Free");

  const steps = [
    { label: "اطلاعات اصلی", icon: Rocket },
    { label: "تصاویر و ویدیو", icon: Image },
    { label: "توضیحات و قیمت", icon: Coins },
    { label: "تایید و ثبت", icon: CheckCircle },
  ];

  const schema = z.object({
    url: z.string().url({ message: "آدرس محصول نامعتبر میباشد !" }),
    name: z
      .string()
      .min(3, { message: "نام محصول باید حداقل 3 کاراکتر باشد !" })
      .max(20, {
        message: "نام محصول نمیتواند بیشتر از 20 کاراکتر باشد !",
      }),
    englishName: z.string().regex(/^[a-zA-Z0-9 _-]{3,15}$/, {
      message:
        "این فیلد باید بین 3 تا 15 کاراکتر و شامل حروف، اعداد، فاصله، خط تیره یا زیرخط باشد.",
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
    firstComment: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
      name: "",
      englishName: "",
      tagline: "",
      instagram: "",
      linkedin: "",
      sourceCodeUrl: "",
      description: "",
      categories: [],
      firstComment: "",
    },
  });

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep >= 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-10 flex flex-col gap-5 px-7 lg:mt-10 lg:flex-row lg:items-start">
      <Steps steps={steps} currentStep={currentStep} />
      <motion.div
        className="w-full rounded-lg border border-base-300 bg-base-100 p-5 shadow-sm"
        key={currentStep}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && (
          <Step1
            register={register}
            errors={errors}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {currentStep === 2 && (
          <Step2
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            gallery={gallery}
            setGallery={setGallery}
            video={video}
            setVideo={setVideo}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {currentStep === 3 && (
          <Step3
            pricing={pricing}
            setPricing={setPricing}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {currentStep === 4 && (
          <Step4
            formData={formData}
            categories={selectedCategories}
            thumbnail={thumbnail}
            gallery={gallery}
            video={video}
            pricing={pricing}
            prevStep={prevStep}
          />
        )}
      </motion.div>
    </div>
  );
};

export default NewProductForm;
