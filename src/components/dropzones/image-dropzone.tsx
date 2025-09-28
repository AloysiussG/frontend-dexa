import { uploadImage } from "@/lib/services";
import { addToast, Button } from "@heroui/react";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export type ImageProps = {
  id?: string;
  url: string;
};

type ImageDropzoneProps = {
  onDropCallback: (image: ImageProps) => void;
  onRemoveFileCallback: () => void;
  imgSrcBackground?: string;
  imgPreview?: ImageProps;
  aspectRatio?: "16:9" | "4:3" | "1:1";
};

const ImageDropzone = ({
  onDropCallback,
  onRemoveFileCallback,
  imgSrcBackground,
  imgPreview,
  aspectRatio,
}: ImageDropzoneProps) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        console.log(acceptedFiles);
        if (acceptedFiles?.length) {
          const imgFile = acceptedFiles[0];

          // upload image to server
          const imageObject = await uploadImage(imgFile);

          // setelah berhasil upload, kirim ke parent component
          onDropCallback(imageObject || null);

          // pakai object assign daripada object spread
          // ada properties yang hilang kalo pake object spread
          // const imgFilePlusPreview = Object.assign(imgFile, {
          //   preview: URL.createObjectURL(imgFile),
          // });
          // onDropCallback(imgFile);
        }
      } catch (error: unknown) {
        let message = "An error occurred during image upload.";
        if (error instanceof Error) {
          message = error.message;
        }
        addToast({
          title: message,
          color: "danger",
        });
      }
    },
    [onDropCallback]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {imgPreview && imgPreview?.url ? (
        <div className="relative">
          <Image
            width={
              aspectRatio === "16:9"
                ? 1920
                : aspectRatio === "4:3"
                ? 1280
                : aspectRatio === "1:1"
                ? 1080
                : 1920
            }
            height={1080}
            className={`${
              aspectRatio === "16:9"
                ? "aspect-video"
                : aspectRatio === "4:3"
                ? "aspect-[4/3]"
                : aspectRatio === "1:1"
                ? "aspect-[1/1]"
                : "aspect-[16/9]"
            } w-full h-full object-cover rounded-2xl border-2 border-lightgray`}
            src={imgPreview?.url}
            alt="..."
          />
          <div className="absolute -top-2 -right-2">
            <Button
              type="button"
              onPress={onRemoveFileCallback}
              className="min-w-0 min-h-0 bg-dexa-primary mx-auto justify-center flex items-center text-white"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex items-center justify-center w-full">
            <label
              className={`${
                isDragActive ? "bg-default-200" : "bg-default-100"
              } hover:bg-default-50 relative overflow-hidden flex flex-col items-center justify-center w-full ${
                aspectRatio === "16:9"
                  ? "aspect-video"
                  : aspectRatio === "4:3"
                  ? "aspect-[4/3]"
                  : aspectRatio === "1:1"
                  ? "aspect-[1/1]"
                  : "aspect-[16/9]"
              } border-2 border-default-200 border-dashed rounded-2xl cursor-pointer`}
            >
              {imgSrcBackground && (
                <Image
                  width={
                    aspectRatio === "16:9"
                      ? 1920
                      : aspectRatio === "4:3"
                      ? 1280
                      : aspectRatio === "1:1"
                      ? 1080
                      : 1920
                  }
                  className="w-full h-full object-cover absolute opacity-10"
                  src={imgSrcBackground}
                  alt=""
                />
              )}
              <div className="flex flex-col items-center gap-0 md:gap-2 justify-center pt-5 pb-6">
                <CloudUpload
                  className="text-foreground-700 gap-1 md:mb-2 max-w-10 md:w-full"
                  size={50}
                  strokeWidth={1.5}
                />
                <p className="text-sm md:text-lg text-foreground-700">
                  {isDragActive ? (
                    <span className="font-semibold">Drop the file here!</span>
                  ) : (
                    <>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </>
                  )}
                </p>
                <p className="text-sm text-foreground-700">JPG, JPEG, or PNG</p>
              </div>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDropzone;
