"use client";

import axios from "axios";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const mutation = useMutation({
    mutationFn: () => axios.post("/api/feedback", { message }),
    onSuccess: () => {
      setMessage("");
      setErr("");
      toast.success("پیام شما با موفقیت ارسال شد");
    },
  });

  const handleFeedback = () => {
    setErr("");
    if (!message || message.length < 8) {
      setErr("متن پیام باید حداقل 8 کاراکتر باشد");
      return;
    } else {
      mutation.mutate();
    }
  };

  return (
    <div className="card mt-10 h-fit w-full lg:w-1/2 border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-3">
        <h2 className="card-title self-center">پیشنهادات و انتقادات</h2>
        <label className="form-control space-y-1">
          <div className="label">
            <span className="label-text font-semibold">پیام شما :</span>
          </div>
          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام شما ..."
            className="textarea textarea-bordered w-full placeholder:text-sm"
          />
          {err && (
            <p className="!mt-3 mr-2 text-xs font-semibold text-error">{err}</p>
          )}
        </label>
        <button disabled={mutation.isPending} onClick={handleFeedback} className="btn btn-secondary">
          ارسال
        </button>
      </div>
    </div>
  );
};

export default Feedback;
