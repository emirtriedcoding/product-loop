"use client";

import Link from "next/link";
import axios from "axios";

import Loader from "@/components/loader/Loader";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { timeAgo } from "@/lib/helpers";

import { ChevronUp, Heart, MessageCircle } from "lucide-react";

const Notifications = () => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      axios.put("/api/user/notifications");
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return axios.get("/api/user/notifications").then((res) => res.data);
    },
  });

  if (isLoading) return Loader();

  const unreadNotifications = notifications.filter((notif) => !notif.read);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-5 p-5 min-h-[900px]">
      <h2 className="text-xl font-bold">
        اعلانات حساب کاربری : {unreadNotifications.length}
      </h2>
      <span className="divider"></span>
      {notifications.length ? (
        notifications.map((notif) => (
          <div
            key={notif._id}
            className="card w-full border border-base-300 bg-base-100 shadow-md"
          >
            <div className="card-body gap-5">
              <h6 className="text-sm font-bold">{notif.subject}</h6>
              <p className="!mb-3 text-sm font-semibold text-gray-500">
                {notif.message}
              </p>
              <span className="text-sm font-semibold">محصول : </span>
              <Link
                href={`/products/${notif.product?.slug || ""}`}
                target="_blank"
                className="mr-1 text-sm font-bold text-info"
              >
                {notif.product?.name || "محصول حذف شده است !"}
              </Link>
              <div className="text-xs font-bold text-gray-500">
                {timeAgo(notif.createdAt)}
              </div>
              {notif.type === "Upvote" && (
                <ChevronUp className="text-gray-500" size={20} />
              )}
              {notif.type === "Comment" && (
                <MessageCircle className="self-end text-gray-500" size={20} />
              )}
              {notif.type === "Like" && (
                <Heart className="text-gray-500" size={20} />
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg font-bold text-gray-500">
          فعلا چیزی اینجا وجود نداره !
        </p>
      )}
    </div>
  );
};

export default Notifications;
