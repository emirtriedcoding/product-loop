"use client";

import { useEffect } from "react";

const ImageModal = ({ src }) => {
  useEffect(() => {
    src && document.getElementById("image_modal").showModal();
  }, [src]);

  return (
    <dialog id="image_modal" className="modal">
      <div className="modal-box flex w-[900px] max-w-none flex-col items-center gap-3">
        <img
          src={src}
          alt="Image in full size"
          className="h-full w-full rounded-xl object-contain"
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
};

export default ImageModal;
