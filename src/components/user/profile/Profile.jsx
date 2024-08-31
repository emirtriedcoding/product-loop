"use client";

import Link from "next/link";
import axios from "axios";

import { useMutation } from "@tanstack/react-query";

import { signOut } from "next-auth/react";

import { Bell, Heart, MessageCircleMore, MonitorCheck } from "lucide-react";

const Profile = ({ user }) => {
  const topProduct = user.products.sort(
    (a, b) => b.upvotes.length - a.upvotes.length,
  )[0];

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.get("/api/user/delete-account");
    },
    onSuccess: async () => await signOut(),
  });

  return (
    <div className="space-y-5 px-10">
      <h2 className="text-lg font-bold">اطلاعات حساب کاربری : </h2>
      <div className="flex flex-col items-center gap-5 rounded-lg bg-white p-5 text-sm font-bold shadow-md">
        <img
          src={user.image || "/assets/avatar.png"}
          alt="User Avatar"
          className="h-40 w-40 rounded-full shadow-md"
        />
        <span>{user.name}</span>
        <span>{user.email}</span>
        <span>تعداد محصولات : {user.products.length}</span>
        <span className="flex items-center gap-2">
          برترین محصول :{" "}
          {topProduct ? (
            <Link href={`/products/${topProduct.slug}`} className="!text-info">
              {topProduct.name}
            </Link>
          ) : (
            <p>فعلا هیچی !</p>
          )}
        </span>
        <span>تعداد‌ کامنت ها : {user.comments.length}</span>
        <span>تعداد ذخیره شده ها : {user.saved.length}</span>
        <div className="flex w-full flex-col gap-3">
          <Link className="btn btn-neutral !w-full" href={"/my-products"}>
            محصولات من
            <MonitorCheck size={15} strokeWidth={2.5} />
          </Link>
          <Link className="btn !w-full" href={"/saved"}>
            ذخیره شده ها
            <Heart size={15} strokeWidth={2.5} />
          </Link>
          <Link className="btn !w-full" href={"/my-comments"}>
            نظرات من
            <MessageCircleMore size={15} strokeWidth={2.5} />
          </Link>
          <Link className="btn !w-full" href={"/notifications"}>
            اعلانات
            <Bell size={15} strokeWidth={2.5} />
          </Link>
          <span className="divider">حذف حساب کاربری</span>
          <button
            className="btn btn-error"
            onClick={() =>
              document.getElementById("delete_account_modal").showModal()
            }
          >
            حذف حساب کاربری
          </button>
          <span className="mt-3 text-center text-xs font-bold text-gray-500">
            تاریخ ملحق شدن به ما :{" "}
            {new Date(user.createdAt).toLocaleDateString("fa-IR")}{" "}
          </span>
        </div>
      </div>
      <dialog id="delete_account_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">آیا اطمینان کامل دارید ؟</h3>
          <p className="py-4 text-center text-[13px] font-semibold leading-loose text-error">
            با انجام این عملیات حساب کاربری شما به علاوه تمامی دیتای آن از جمله
            محصولات - نظرات - اعلانات و ... برای همیشه حذف خواهند شد و این
            عملیات هرگز قابل بازگشت نخواهد بود !
          </p>
          <button
            onClick={() => mutation.mutate()}
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

export default Profile;
