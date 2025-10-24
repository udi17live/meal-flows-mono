"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import MFButton from "../../buttons/MFButton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import SeparatorWithText from "../../SeparatorWIthText";
import MFButtonSecondary from "../../buttons/MFButtonSecondary";

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
      <div className="flex flex-col gap-8">
        <MFButton label="Send reset Link" trailingIcon={ArrowRight} />
        <SeparatorWithText text="OR" />
        <div className="flex flex-col gap-4">
          <MFButtonSecondary
            label="Login"
            trailingIcon={ArrowRight}
            onClick={() => {
              router.push("/admin/login");
            }}
          />
          <MFButtonSecondary
            label="Register your Kitchen"
            trailingIcon={ArrowRight}
            onClick={() => {
              router.push("/admin/register");
            }}
          />
        </div>
      </div>
    </div>
  );
}
