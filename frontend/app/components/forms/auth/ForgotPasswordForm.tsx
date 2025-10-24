"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import MFButton from "../../buttons/MFButton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-col w-full space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="you@mealflowz.com"
          name="email"
          className="w-full px-6 py-6 rounded"
        />
      </div>
      <MFButton label="Send reset Link" trailingIcon={ArrowRight} />
      <MFButton
        label="Back to Login"
        trailingIcon={ArrowRight}
        bgColor="bg-gray-200"
        textColor="text-mf-blue"
        bgColorHover="hover:bg-gray-400/90"
        textColorHover="hover:opacity-90"
        onClick={() => {
          router.push("/admin/login");
        }}
      />
    </div>
  );
}
