"use client";

import Link from "next/link";

import axios from "axios";

import Upvote from "@/components/upvote/Upvote";
import ImageModal from "@/components/modals/ImageModal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { timeAgo } from "@/lib/helpers";
import { categories } from "@/lib/constants";

import {
  ChartNoAxesCombined,
  Heart,
  HeartPulse,
  Instagram,
  Linkedin,
  MessageCircle,
  Pin,
  Share,
} from "lucide-react";

const Product = ({ product, user, rank }) => {
  const router = useRouter();

  const [comment, setComment] = useState("");

  const [visibleComments, setVisibleComments] = useState(5);
  const [visibleReplies, setVisibleReplies] = useState(1);

  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);

  const [reply, setReply] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const pp =
    product.pricing === "Free"
      ? "رایگان"
      : product.pricing === "Paid"
        ? "غیر رایگان ( برای استفاده از خدمات باید هزینه ای پرداخت نمایید )"
        : "اشتراکی";

  const saveMutation = useMutation({
    mutationFn: async () => {
      return axios.put("/api/save", {
        productId: product._id,
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.msg);
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
  });

  const handleSave = async () => {
    if (!user) {
      return document.getElementById("auth_modal").showModal();
    } else {
      saveMutation.mutate();
    }
  };

  const commentMutation = useMutation({
    mutationFn: async () => {
      return axios.post("/api/comments", {
        comment,
        productId: product._id,
      });
    },
    onSuccess: () => {
      toast.success("نظر شما با موفقیت ثبت شد");
      setComment("");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
  });

  const handleComment = () => {
    if (comment.trim() === "") {
      return toast.error("نظر خود را وارد کنید");
    }

    commentMutation.mutate();
  };

  const likeCommentMutation = useMutation({
    mutationFn: async (commentId) => {
      return axios.put("/api/comments", {
        commentId,
      });
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
  });

  const handleLikeComment = (commentId) => {
    if (!user) {
      return document.getElementById("auth_modal").showModal();
    } else {
      likeCommentMutation.mutate(commentId);
    }
  };

  const replyMutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/replies", {
        body: reply,
        commentId: activeReplyCommentId,
      });
    },
    onSuccess: () => {
      setReply("");
      setActiveReplyCommentId(null);
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
  });


  const handleLoadMore = () => {
    setVisibleComments(product.comments.length);
  };

  const handleReplyToggle = (commentId) => {
    if (!user) {
      return document.getElementById("auth_modal").showModal();
    } else {
      setActiveReplyCommentId((prev) =>
        prev === commentId ? null : commentId,
      );
    }
  };

  const handleReply = () => {
    if (!reply.trim()) {
      return toast.error("پاسخ نمیتواند خالی باشد !");
    } else {
      replyMutation.mutate();
    }
  };

  

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto space-y-8 p-4 lg:max-w-4xl"
    >
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="flex items-center gap-5">
          <img
            src={product.thumbnail}
            alt="Logo"
            className="h-24 w-24 rounded-full shadow-xl shadow-secondary/20"
          />
          <div className="space-y-3">
            <h1 className="text-xl font-bold text-neutral">{product.name}</h1>
            <p className="text-sm font-semibold text-gray-500">
              {product.tagline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Upvote product={product} user={user} />
          <Link
            href={`${product.url}?ref=persian-launch`}
            target="_blank"
            className="btn btn-outline"
          >
            مشاهده وبسایت
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
        <span className="text-xs font-semibold text-secondary">
          نحوه خدمات : {pp}
        </span>
        <div className="flex items-center gap-3 text-[9px] lg:text-xs font-semibold lg:gap-5">
          <Link
            className="flex cursor-pointer items-center gap-2 transition hover:scale-105"
            href="#comments"
          >
            گفت و گو و نظرات
            <MessageCircle size={15} className="mb-0.5" />
          </Link>
          <span
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
              );
              toast.success("با موفقیت کپی شد !");
            }}
            className="flex cursor-pointer items-center gap-2 transition hover:scale-105"
          >
            اشتراک گذاری
            <Share size={15} className="mb-1" />
          </span>
          <Link
            href="#status"
            className="flex cursor-pointer items-center gap-2 transition hover:scale-105"
          >
            وضعیت
            <ChartNoAxesCombined size={15} className="mb-1" />
          </Link>
          <span
            onClick={handleSave}
            className="flex cursor-pointer items-center gap-2 transition hover:scale-105"
          >
            ذخیره
            <HeartPulse
              size={15}
              className={`${user?.saved.some((p) => p._id === product._id) ? "fill-rose-500 text-rose-500" : ""} mb-1`}
            />
          </span>
        </div>
      </div>
      <p className="text-pretty text-sm font-semibold leading-10 text-gray-500">
        {product.description}
      </p>
      <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-tight lg:justify-start">
        دسته بندی ها :
        {product.categories.map((cat) => {
          const category = categories.find((c) => c.english === cat);
          return (
            category && (
              <Link
                key={cat}
                href={`/categories/${category.english}`}
                className="rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white lg:text-xs transition hover:rotate-2"
              >
                {category.persian}
              </Link>
            )
          );
        })}
      </div>
      <p className="!-mb-3 text-sm font-bold">تصاویری از محصول : </p>
      <div className="flex justify-center rounded-lg bg-base-200 p-5 shadow-sm">
        <div className="carousel w-full gap-2 rounded-box">
          {product.video && (
            <div className="carousel-item">
              <iframe className="w-full" src={product.video} allowFullScreen />
            </div>
          )}
          {product.gallery.map((img, index) => (
            <div key={index} className="carousel-item">
              <img
                src={img}
                className="w-[300px] cursor-pointer"
                onClick={() => setSelectedImage(img)}
                alt="Product Image"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto grid lg:w-1/2 grid-cols-12 gap-3">
        <div className="avatar online">
          <div className="mask mask-squircle w-16">
            <img src={product.user.image} alt="Maker" />
          </div>
        </div>
        {product.upvotes.map(
          (upvote) =>
            upvote._id !== product.user._id && (
              <div key={upvote._id} className="avatar offline">
                <div className="mask mask-squircle w-16">
                  <img src={upvote.image} alt="Upvoter" />
                </div>
              </div>
            ),
        )}
      </div>
      <span className="divider"></span>
      {user ? (
        <div className="flex flex-col gap-3 lg:flex-row">
          <img src={user?.image} alt="User image" className="h-10 w-10 rounded-full" />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="نظر شما راجب این محصول ؟"
          />
          <button
            disabled={commentMutation.isPending}
            onClick={handleComment}
            className="btn btn-primary self-end"
          >
            ارسال کامنت
          </button>
        </div>
      ) : (
        <div className="mt-3 space-y-3 font-bold">
          <p className="text-center">برای ارسال نظر ابتدا وارد شوید </p>
          <button
            onClick={() => document.getElementById("auth_modal").showModal()}
            className="btn btn-primary w-full"
          >
            ورود
          </button>
        </div>
      )}
      <span className="divider"></span>
      <div id="comments" className="space-y-3">
        {product.firstComment && (
          <div className="!space-y-5">
            <div className="flex flex-col gap-5 rounded-lg border border-base-300 bg-base-100 p-5">
              <div className="flex flex-row-reverse gap-3">
                <img
                  src={product.user.image  || "/assets/avatar.png"}
                  alt="Maker"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex items-center gap-2">
                  <Pin strokeWidth={1.5} size={15} />
                  <p className="text-xs text-gray-500">{product.user.email.slice(0,5)}..@gmail.com</p>
                  <span className="text-sm font-semibold">
                    {product.user.name.slice(0,10)}
                  </span>
                </div>
              </div>
              <pre className="self-start overflow-hidden whitespace-pre-wrap font-sans text-sm font-semibold leading-loose">
                {product.firstComment}
              </pre>
            </div>
          </div>
        )}
        {product.comments.slice(0, visibleComments).map((comment) => (
          <div className="!space-y-5" key={comment._id}>
            <div className="flex flex-col gap-5 rounded-lg border border-base-300 bg-base-100 p-5">
              <div className="flex flex-row-reverse gap-3">
                <img
                  src={comment.user.image || "/assets/avatar.png"}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex items-center gap-2">
                  {comment.user._id === product.user._id && (
                    <div className="ml-2 rounded-lg bg-secondary p-1.5 text-[10px] font-bold text-white">
                      سازنده
                    </div>
                  )}
                  <p className="text-xs text-gray-500">{comment.user.email.slice(0,5)}..@gmail.com</p>
                  <span className="text-xs font-semibold">
                    {comment.user.name.split(" ")[0]}
                  </span>
                </div>
              </div>
              <p className="self-start text-xs lg:text-sm font-semibold !leading-8">{comment.body}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                  <span>{timeAgo(comment.createdAt)}</span>
                  <span
                    onClick={() => handleLikeComment(comment._id)}
                    className="btn btn-xs flex items-center gap-2"
                  >
                    <Heart
                      className={`${comment.likes.includes(user?._id) ? "fill-rose-500 text-rose-500" : ""}`}
                      size={15}
                    />
                    پسندیدن - {comment.likes.length}
                  </span>
                  <button
                    onClick={() => handleReplyToggle(comment._id)}
                    className="btn btn-neutral btn-xs text-xs"
                  >
                    پاسخ
                  </button>
                </div>
                {visibleReplies < comment.replies.length && (
                  <button
                    onClick={() => setVisibleReplies(comment.replies.length)}
                    className="btn"
                  >
                    پاسخ های بیشتر
                  </button>
                )}
              </div>
            </div>
            {activeReplyCommentId === comment._id && (
              <div className="flex gap-3">
                <img src={user.image} alt="User" className="h-10 w-10 rounded-full" />
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="پاسخ شما ؟"
                />
                <div className="!space-y-3">
                  <button
                    onClick={handleReply}
                    disabled={replyMutation.isPending}
                    className="btn btn-primary w-full self-end"
                  >
                    ارسال
                  </button>
                  <button
                    onClick={() => handleReplyToggle(comment._id)}
                    className="btn btn-error w-full"
                  >
                    لغو
                  </button>
                </div>
              </div>
            )}

            {comment.replies.slice(0, visibleReplies).map((reply) => (
              <div
                key={reply._id}
                className="mr-5 flex flex-col gap-5 rounded-lg border border-base-300 bg-base-100 p-5"
              >
                <div className="flex flex-row-reverse gap-3">
                  <img
                    src={reply.user.image}
                    alt="User"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">{reply.user.email.slice(0, 5)}...@gmail.com</p>
                    <span className="text-xs font-semibold">
                      {reply.user.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <p className="self-start text-xs lg:text-sm font-semibold !leading-8">{reply.body}</p>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                  <span>{timeAgo(reply.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
        {visibleComments < product.comments.length && (
          <button onClick={handleLoadMore} className="btn btn-neutral w-full">
            کامنت های بیشتر
          </button>
        )}
      </div>

      <div
        id="status"
        className="my-10 flex flex-col gap-8 rounded-lg bg-primary/5 p-5"
      >
        <h3 className="text-lg font-bold">درباره این محصول : </h3>
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={product.thumbnail} alt="Product Logo" className="h-14 w-14 rounded-lg" />
            <div className="space-y-2 font-bold">
              <span>{product.name}</span>
              <p className="text-xs text-gray-500">{product.tagline}</p>
            </div>
          </div>
          <Upvote product={product} user={user} />
        </div>
        <div className="flex items-center gap-3">
          {product.instagram && (
            <Link href={`https://instagram.com/${product.instagram}`}>
              <Instagram
                size={18}
                strokeWidth={1.5}
                className="text-rose-500"
              />
            </Link>
          )}
          {product.linkedin && (
            <Link href={`https://linkedin.com/in/${product.linkedin}`}>
              <Linkedin size={18} strokeWidth={1.5} className="text-sky-500" />
            </Link>
          )}
        </div>
        <p className="text-xs font-bold !leading-8 text-center">
          محصول {product.name} در تاریخ{" "}
          {new Date(product.createdAt).toLocaleDateString("fa-IR")} توسط کاربر و
          سازنده آن ینی {product.user.name} در وبسایت پروداکت لوپ ایجاد و منشتر
          گردیده است .
        </p>
        <p className="text-xs font-semibold text-gray-500">
          این محصول به صورت متن باز {product.sourceCodeUrl ? "بوده" : "نبوده"}
        </p>
        {product.sourceCodeUrl && (
          <p className="text-xs font-semibold text-gray-500">
            لینک سورس کد محصول :{" "}
            <Link
              href={product.sourceCodeUrl}
              target="_blank"
              className="text-info"
            >
              کلیک کنید
            </Link>
          </p>
        )}
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="flex flex-col items-center gap-3 text-lg font-bold">
            <span className="text-sm">رتبه محصول : </span>
            <span className="text-secondary">#{rank}</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-lg font-bold">
            <span className="text-sm">تعداد نظرات : </span>
            <span className="text-secondary">{product.comments.length}</span>
          </div>
          <div className="flex flex-col items-center gap-3 text-lg font-bold">
            <span className="text-sm">تعداد رای های محصول : </span>
            <span className="text-secondary">{product.upvotes.length}</span>
          </div>
        </div>
      </div>
      <ImageModal src={selectedImage} />
    </motion.div>
  );
};

export default Product;
