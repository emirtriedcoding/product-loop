"use client";

import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ChevronUp } from "lucide-react";

const Upvote = ({ product, user, isReview = false }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.put(`/api/products/upvote/${product._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      router.refresh();
    },
  });

  const handleUpvote = () => {
    if (!user) {
      document.getElementById("auth_modal").showModal();
    } else {
      mutation.mutate();
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`btn !flex !flex-row ${
        isReview
          ? product.upvotes.includes(user._id)
            ? "btn-primary"
            : "btn-neutral"
          : product.upvotes.some((u) => u._id === user._id)
            ? "btn-primary"
            : "btn-neutral"
      } ${isReview ? "btn-square" : ""}`}
    >
      {isReview ? (
        <ChevronUp size={22} className="w-full" />
      ) : (
        <p>
          {product.upvotes.some((u) => u._id === user._id)
            ? "گرفتن رای"
            : "رای  دادن"}
        </p>
      )}
      <div className="-mt-3 text-xs">{product.upvotes.length}</div>
    </button>
  );
};

export default Upvote;
