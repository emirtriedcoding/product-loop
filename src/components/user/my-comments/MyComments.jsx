"use client";

import Link from "next/link";
import axios from "axios";

import Loader from "@/components/loader/Loader";

import { useQuery } from "@tanstack/react-query";

import { timeAgo } from "@/lib/helpers";

import { Heart, MessageCircle } from "lucide-react";

const MyComments = () => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["myComments"],
    queryFn: async () => {
      return axios.get("/api/user/my-comments").then((res) => res.data);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto h-screen max-w-lg space-y-3 p-5">
      <h2 className="text-center text-xl font-bold">
        نظرات من ({comments.length})
      </h2>
      <span className="divider"></span>
      {comments.length ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="card w-full border border-base-300 bg-base-100 shadow-sm"
          >
            <div className="card-body gap-4">
              <p className="text !text-justify text-xs font-semibold !leading-7 lg:text-sm lg:!leading-9">
                {comment.body.length > 100
                  ? comment.body.slice(0, 100) + "..."
                  : comment.body}
              </p>
              <div className="flex items-center gap-5 text-xs font-bold">
                <span className="flex items-center gap-1">
                  <Heart size={15} className="fill-rose-500 text-rose-500" /> :{" "}
                  {comment.likes.length}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle
                    size={15}
                    className="fill-rose-500 text-rose-500"
                  />{" "}
                  : {comment.replies.length}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>محصول :</span>
                <Link
                  href={`/products/${comment.product.slug}`}
                  className="text-info"
                >
                  {comment.product.name}
                </Link>
              </div>
              <p className="self-center text-xs font-semibold text-gray-500">
                {timeAgo(comment.createdAt)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="space-y-5">
          <p className="text-center font-bold">فعلا هیچ نظری ثبت نکردی !</p>
          <Link href={"/products"} className="btn btn-primary w-full">
            مشاهده محصولات و ثبت اولین نظر
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyComments;
