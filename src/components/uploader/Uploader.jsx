"use client";

import { useState } from "react";
import { S3 } from "aws-sdk";

const Uploader = ({ onUpload, multiple }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    try {
      setLoading(true);

      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_KEY,
        endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
      });

      const permLinks = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const params = {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
          Key: file.name,
          Body: file,
        };

        await s3.upload(params).promise();

        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
          Key: file.name,
          Expires: 31536000, // 1 year expiration
        });

        permLinks.push(permanentSignedUrl);
      }

      onUpload(permLinks);
    } catch (error) {
      setError("Error uploading files: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 lg:flex-row">
      <input
        className="file-input file-input-sm"
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        className="btn w-full lg:w-fit"
        onClick={handleUpload}
        disabled={files.length === 0 || loading}
      >
        آپلود
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Uploader;
