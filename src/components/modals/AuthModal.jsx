"use client";

import { signIn } from "next-auth/react";

const AuthModal = () => {
  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box flex flex-col items-center gap-3">
        <h3 className="text-lg font-bold">ورود یا ثبت نام - پروداکت لوپ</h3>
        <p className="text-center text-sm leading-relaxed text-gray-500">
          سلام رفیق ! از اینکه میخوای به جمع ما اضافه بشی خیلی خوشحالیم و
          امیدواریم بهترین تجربه ها واست رقم بخوره !
        </p>
        <button
          onClick={async () => await signIn("google")}
          className="btn w-full !bg-white"
        >
          ورود از طریق گوگل
          <img src="/assets/google.svg" alt="Google icon" className="h-5 w-5" />
        </button>
        <button
          onClick={async () => await signIn("github")}
          className="btn w-full"
        >
          ورود از طریق گیت هاب
          <img src="/assets/github.svg" alt="Github icon" className="h-5 w-5" />
        </button>
        <p className="mt-4 text-[10px] lg:text-xs font-semibold text-warning">
          اگه حساب کاربری ندارید فقط وارد شید و ثبت نام اتوماتیک انجام میشه !
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};

export default AuthModal;
