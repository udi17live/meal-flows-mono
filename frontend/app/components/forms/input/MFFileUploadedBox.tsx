import { bytesToOther } from "@/app/lib/utils";
import { Cross, File, View, X } from "lucide-react";
import MFButtonSecondary from "../../buttons/MFButtonSecondary";

interface MFFileUploadedBoxProps {
  fileName: string;
  size?: number;
  onClick: () => void;
  openFile: () => void;
}

export default function MFFileUploadedBox({
  fileName,
  size,
  onClick,
  openFile,
}: MFFileUploadedBoxProps) {
  return (
    <div className="flex flex-col justify-between items-center gap-4 bg-mf-green/20 p-4 y-4 rounded border-2 border-dashed ">
      <File />
      {fileName}
      {size && ` (${bytesToOther(size)})`}
      <MFButtonSecondary
        label="View File"
        className="p-2 w-fit bg-mf-green/35"
        leadingIcon={View}
        onClick={openFile}
      />
      <MFButtonSecondary
        label="Clear and Upload Again"
        className="p-2 w-fit bg-mf-green/35"
        leadingIcon={X}
        onClick={onClick}
      />
    </div>
  );
}
