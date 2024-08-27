"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { formatFileSize } from "@edgestore/react/utils";
import { UploadCloudIcon, X } from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const variants = {
  base: "relative text-center rounded-md flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  width: number;
  height: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
  initialImageUrl?: string;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      dropzoneOptions,
      width,
      height,
      value,
      className,
      disabled,
      onChange,
      initialImageUrl,
    },
    ref,
  ) => {
    const imageUrl = React.useMemo(() => {
      if (typeof value === "string") {
        // in case an url is passed in, use it to display the image
        return value;
      } else if (value) {
        // in case a file is passed in, create a base64 url to display the image
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          void onChange?.(file);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          initialImageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} />
          {initialImageUrl ? (
            <Avatar className="h-full w-full rounded-md object-cover">
              <AvatarImage
                src={initialImageUrl || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="h-full w-full text-heading4-bold font-light">
                Avatar
              </AvatarFallback>
            </Avatar>
          ) : imageUrl ? (
            <Avatar className="h-full w-full rounded-md object-cover">
              <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback className="h-full w-full text-heading4-bold font-light">
                {acceptedFiles[0]?.name}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 text-small-medium text-gray-400">
              <UploadCloudIcon className="mb-2 h-7 w-7" />
              <div className="text-gray-400">Drag & Drop to upload</div>
              <div className="mt-3">
                <Button type="button" disabled={disabled}>
                  select
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Error Text */}
        <div className="text-xs mt-1 text-red-500">{errorMessage}</div>
      </div>
    );
  },
);
SingleImageDropzone.displayName = "SingleImageDropzone";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        // base
        "text-sm inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // color
        "border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700",
        // size
        "text-xs h-6 rounded-md px-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { SingleImageDropzone };

export default function SingleImageUpload(params: {
  onChange?: (value: string) => void | Promise<void>;
  height?: number;
  width?: number;
  image?: string;
}) {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<
    "PENDING" | "COMPLETE" | "ERROR" | number
  >("PENDING");
  const [uploadRes, setUploadRes] = React.useState<string>();
  const { edgestore } = useEdgeStore();
  React.useEffect(() => {
    if (uploadRes) {
      void params.onChange?.(uploadRes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadRes]);

  React.useEffect(() => {
    if (file) {
      uploadFile(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const uploadFile = async (file: File) => {
    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: async (newProgress: number) => {
          setProgress(newProgress);
          if (newProgress === 100) {
            // wait 1 second to set it to complete
            // so that the user can see it at 100%
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setProgress("COMPLETE");
          }
        },
      });
      setUploadRes(res.url);
    } catch (err) {
      setProgress("ERROR");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <SingleImageDropzone
        height={params.height || 200}
        width={params.width || 200}
        initialImageUrl={params.image}
        value={file}
        onChange={async (addedFile) => {
          setFile(addedFile);
        }}
        disabled={progress !== "PENDING"}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
      />
    </div>
  );
}
