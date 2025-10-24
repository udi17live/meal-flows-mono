"use client";

import React, { useState } from "react";
import SeparatorWithText from "../../SeparatorWIthText";
import { Ban, Files } from "lucide-react";
import {
  isFileTypeAccepted,
  isUploadLimitExceeded,
  megabytesToBytes,
} from "@/app/lib/utils";
import { Input } from "@/components/ui/input";

interface MFUploadAreaProps {
  acceptedFileExt?: string[];
  setDataFile: (file: File | null) => void;
  isMultiUpload?: boolean;
  uploadLimitInMB?: number | null;
}

export default function MFUploadArea({
  acceptedFileExt = ["*"],
  setDataFile,
  isMultiUpload = false,
  uploadLimitInMB = null,
}: MFUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError("");

    let files = Array.from(e.dataTransfer.files);
    const isMultiUpload = files.length == 0 || files.length > 1;
    let file: File | null = null;
    if (isMultiUpload == false) {
      file = files[0];
      console.log("File: ", file);
      if (isUploadLimitExceeded(file.size, megabytesToBytes(uploadLimitInMB))) {
        setError(`Exceeded max upload limit of ${uploadLimitInMB}MB`);
        setDataFile(null);
        return;
      }
      const fileType = file.type;

      const isValid = isFileTypeAccepted(fileType, acceptedFileExt);

      if (isValid) {
        setDataFile(file);
      } else {
        setError(`Invalid File Type, you can only sumbit ${acceptedFileExt}`);
        setDataFile(null);
      }
    } else {
      setError(`Multifile/No file Upload is Not Supported`);
    }
  };

  const handleClickUpload = async (e) => {
    e.preventDefault();
    const file = await e.target.files?.[0];
    setError("");
    if (!file) {
      return;
    }
    const limit = megabytesToBytes(uploadLimitInMB);
    if (file.size > limit) {
      setError(`Exceeded max upload limit of ${uploadLimitInMB}MB`);
      e.target.value = "";
      setDataFile(null);
      return;
    }

    if (!isFileTypeAccepted(file.type, acceptedFileExt)) {
      setError(
        `Invalid File Type, you can only submit ${acceptedFileExt.join(", ")}`
      );
      e.target.value = "";
      setDataFile(null);
      return;
    }

    setDataFile(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="w-full flex flex-col justify-center items-center bg-gray-100 border-2 border-dashed border-gray-300 py-6 rounded gap-4"
    >
      <Files />
      <p>
        {isDragging
          ? "Drop file here ..."
          : `Drag and drop files (max ${uploadLimitInMB}MB )`}
      </p>
      <SeparatorWithText text="OR" />
      <Input
        type="file"
        name="file"
        accept={acceptedFileExt.join(",")}
        onChange={handleClickUpload}
        className="w-[80%] rounded p-2 text-center bg-gray-200 hover:bg-gray-200/60 cursor-pointer"
      />

      {error && (
        <p className="flex items-center justify-center gap-3 text-sm p-2 bg-red-200 rounded text-red-700 max-w-[90%]">
          <Ban /> {error}
        </p>
      )}
    </div>
  );
}
