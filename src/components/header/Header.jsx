"use client";

import Link from "next/link";
import AuthModal from "@/components/modals/AuthModal";

import axios from "axios";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { signOut } from "next-auth/react";

import { Bell, Menu } from "lucide-react";

const Header = ({ session }) => {
  const [showMenu, setShowMenu] = useState(false);

  const routes = [
    {
      label: "محصولات و پلتفرم ها",
      path: "/products",
    },
    {
      label: "دسته بندی ها",
      path: "/categories",
    },
    {
      label: "پیشنهادات و انتقادات",
      path: "/feedback",
    },
  ];

  useEffect(() => {
    const setter = () => {
      showMenu && setShowMenu(false);
    };

    document.addEventListener("click", setter);

    return () => {
      document.removeEventListener("click", setter);
    };
  }, [showMenu]);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axios.get("/api/user/notifications").then((res) => res.data),
  });

  return (
    <header className="flex h-[85px] items-center justify-between px-7 shadow-sm lg:px-10">
      <div className="flex items-center gap-3">
        <div className="drawer z-50 lg:hidden">
          <input id="sidebar" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="sidebar">
              <Menu size={22} />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="sidebar"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-60 items-center gap-3 bg-base-200 p-4 text-base-content">
              <Link
                href={"/"}
                className="bg-gradient-to-bl from-primary to-secondary bg-clip-text text-xl font-bold text-transparent"
              >
                پروداکت لوپ
              </Link>
              {routes.map((route) => (
                <li key={route.label}>
                  <Link
                    href={route.path}
                    className="transition hover:scale-105"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          href={"/"}
          className="hidden bg-gradient-to-bl from-primary to-secondary bg-clip-text text-xl font-bold text-transparent lg:block"
        >
          پروداکت لووپ
        </Link>
      </div>
      <div className="hidden items-center gap-8 text-sm font-semibold lg:flex">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.path}
            className="transition hover:scale-105"
          >
            {route.label}
          </Link>
        ))}
      </div>
      {session ? (
        <div className="flex items-center gap-6">
          <Link href={"/my-products/new"}>
            <button className="btn btn-primary">ثبت محصول شما</button>
          </Link>
          <Link className="relative" href={"/notifications"}>
            <Bell size={20} />
            {!isLoading && notifications.some((notif) => !notif.read) && (
              <div className="badge badge-primary badge-xs absolute -top-1 right-0 animate-pulse" />
            )}
          </Link>

          <div className="relative">
            <img
              onClick={() => setShowMenu(true)}
              className="h-10 w-10 cursor-pointer rounded-full"
              alt="Avatar"
              src={session.user.image}
            />
            <div
              className={`${showMenu ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"} absolute left-0 top-full z-50 mt-3 flex w-32 flex-col gap-3 rounded-lg border border-base-300 bg-base-100 p-5 text-sm font-bold shadow-sm transition`}
            >
              <Link href={"/profile"}>پروفایل</Link>
              <Link
                href={"/my-products"}
                className="border-b border-base-300 pb-3"
              >
                محصولات من
              </Link>
              <button
                onClick={async () =>
                  await signOut({
                    callbackUrl: "/",
                  })
                }
                className="btn btn-sm"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => document.getElementById("auth_modal").showModal()}
            className="btn btn-secondary"
          >
            شروع کنید
          </button>
          <AuthModal />
        </>
      )}
    </header>
  );
};

export default Header;
