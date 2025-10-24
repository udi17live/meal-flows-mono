export function isFileTypeAccepted(
  fileType: string,
  acceptedFileTypes: string[]
) {
  if (acceptedFileTypes.includes("*")) {
    return true;
  }

  return acceptedFileTypes.includes(fileType);
}

export function megabytesToBytes(mb: number | null) {
  return (mb ? mb : 0) * 1024 * 1024;
}

export function bytesToOther(bytes: number | null) {
  const b = bytes ?? 0;
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(2)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export function isUploadLimitExceeded(size: number, limit: number) {
  if (limit == 0 || size <= limit) {
    return false;
  }

  return true;
}
