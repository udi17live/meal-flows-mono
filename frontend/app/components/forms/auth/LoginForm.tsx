"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import MFButton from "../../buttons/MFButton";
import { ArrowRight, EyeClosedIcon, EyeIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import MFButtonSecondary from "../../buttons/MFButtonSecondary";
import SeparatorWithText from "../../SeparatorWIthText";

export default function LoginForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-col w-full space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          className="w-full px-6 py-6 rounded"
        />
      </div>
      <div className="flex flex-col w-full space-y-3">
        <div className="flex justify-between">
          <Label htmlFor="email">Password</Label>
          <Link
            href={"/admin/forgot-password"}
            className="cursor-pointer underline underline-offset-1"
          >
            Forgot your password?
          </Link>
        </div>
        <InputGroup className="w-full px-4 py-6 rounded">
          <InputGroupInput
            type={isOpen ? "text" : "password"}
            placeholder="Enter your password"
          />
          <InputGroupAddon
            align="inline-end"
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          >
            {isOpen ? <EyeIcon /> : <EyeClosedIcon />}
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-8">
        <MFButton label="Login" trailingIcon={ArrowRight} />
        <SeparatorWithText text="OR" />
        <MFButtonSecondary
          label="Register your Cloud Kitchen"
          trailingIcon={ArrowRight}
          onClick={() => {
            router.push("/admin/register");
          }}
        />
      </div>
    </div>
  );
}
