import { addToast } from "@heroui/react";
import axios from "./axios";

export async function loginApi(data: { email: string; password: string }) {
  const res = await axios.post(`/api/auth/login`, data);
  return res.data; // { id, name, token }
}

export async function uploadImage(
  file: File
): Promise<{ id: string; url: string }> {
  const MAX_UPLOAD_SIZE = 2 * 1024 * 1024; // 2MB
  const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  // file validation
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    throw new Error("File type not supported.");
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error("File size too big (max 2MB).");
  }

  const formData = new FormData();
  formData.append("file", file);

  const promise = axios
    .post(`/api/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(async (res) => {
      // set timeout delay untuk loading
      await new Promise((delayResolve) => setTimeout(delayResolve, 1000));

      if (res.status === 200) {
        const { url, id } = res.data;

        // preload image before resolving
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Image preload failed."));
        });

        // toast when success
        addToast({
          title: "Image uploaded successfully.",
          color: "success",
        });

        return { url, id };
      } else {
        const { message } = res.data;
        const errMsg = message || "Error uploading image. Please try again.";

        // toast when error
        addToast({
          title: errMsg,
          color: "danger",
        });

        throw new Error(errMsg);
      }
    });

  // wrapper with 1s delay
  const delayedPromise = new Promise<{
    url: string;
    id: string;
  }>((resolve, reject) => {
    setTimeout(() => {
      promise.then(resolve).catch(reject);
    }, 1000);
  });

  // loading toast
  addToast({
    title: "Uploading image...",
    color: "default",
    promise: delayedPromise,
  });

  return delayedPromise;
}
