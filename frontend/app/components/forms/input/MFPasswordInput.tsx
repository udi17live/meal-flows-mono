"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

interface MFPasswordInputProps {
  isCovered: boolean;
  setIsCovered: (value: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MFPasswordInput({
  isCovered,
  setIsCovered,
  value,
  onChange,
  placeholder = "Enter your password",
}: MFPasswordInputProps) {
  return (
    <InputGroup className="w-full px-4 py-6 rounded">
      <InputGroupInput
        type={isCovered ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputGroupAddon
        align="inline-end"
        onClick={() => setIsCovered(!isCovered)}
        className="cursor-pointer"
      >
        {isCovered ? <EyeClosedIcon /> : <EyeIcon />}
      </InputGroupAddon>
    </InputGroup>
  );
}
