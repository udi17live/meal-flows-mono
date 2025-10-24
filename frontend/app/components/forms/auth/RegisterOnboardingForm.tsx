"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import MFButton from "../../buttons/MFButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import MFComboBox from "@/app/components/forms/input/MFComboBox";
import MFButtonSecondary from "../../buttons/MFButtonSecondary";
import SeparatorWithText from "../../SeparatorWIthText";
import MFUploadArea from "../input/MFUploadArea";
import MFFileUploadedBox from "../input/MFFileUploadedBox";
import MFPasswordInput from "../input/MFPasswordInput";

// @Todo Fetch and Pass
const cuisines = [
  {
    value: "sri-lankan",
    label: "Sri Lankan",
  },
  {
    value: "indian",
    label: "Indian",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
  {
    value: "italian",
    label: "Italian",
  },
  {
    value: "thai",
    label: "Thai",
  },
  {
    value: "japanese",
    label: "Japanese",
  },
  {
    value: "middle-eastern",
    label: "Middle Eastern",
  },
  {
    value: "american",
    label: "American",
  },
  {
    value: "mexican",
    label: "Mexican",
  },
  {
    value: "fusion",
    label: "Fusion",
  },
];

export default function RegisterOnboardingForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCovered, setIsCovered] = useState(true);
  const [dataCuisine, setDataCuisine] = useState("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dataBRFile, setDataBRFile] = useState<File | null>(null);
  const [dataIDFile, setDataIDFile] = useState<File | null>(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const _setCuisine = (currentCuisine: string) => {
    setDataCuisine(currentCuisine === dataCuisine ? "" : currentCuisine);
    setIsOpen(false);
  };

  const acceptedFileExts: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      {currentStep == 1 ? (
        <>
          <h3 className="text-2xl font-bold uppercase">Restaurant Details</h3>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="res-name">Name*</Label>
            <Input
              required
              type="text"
              name="res-name"
              className="w-full p-6 rounded"
              placeholder="Your restaurant name"
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="email">Email*</Label>
            <Input
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full p-6 rounded"
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="category">Type*</Label>
            <Select required>
              <SelectTrigger className="w-full p-6 rounded">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">Cloud Kitchen</SelectItem>
                <SelectItem value="dinein">Dine-In</SelectItem>
                <SelectItem value="takeaway">Takeaway</SelectItem>
                <SelectItem value="franchise">Franchise</SelectItem>
                <SelectItem value="home">Home-Based</SelectItem>
                <SelectItem value="foodtruck">Food Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="category">Cuisine*</Label>
            <MFComboBox
              options={cuisines}
              onSelect={(value) => _setCuisine(value)}
              selection={dataCuisine}
              isOpen={isOpen}
              setIsOpen={(isOpen) => setIsOpen(isOpen)}
              placeholder="Select cuisine ..."
              searchPlaceHolder="Search cuisine ..."
            />
          </div>
          <div className="flex flex-col w-full space-y-3 mt-4 gap-4">
            <MFButton
              label="Next"
              trailingIcon={ArrowRight}
              className="w-full"
              onClick={() => {
                setCurrentStep(2);
              }}
            />
            <SeparatorWithText text="OR" />
            <MFButtonSecondary
              label="Login to your account"
              trailingIcon={ArrowRight}
              className="w-full"
              onClick={() => router.push("/admin/login")}
            />
          </div>
        </>
      ) : currentStep == 2 ? (
        <>
          <h3 className="text-2xl font-bold uppercase">Manager Details</h3>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="manager-name">Name*</Label>
            <Input
              required
              type="text"
              name="manager-name"
              className="w-full p-6 rounded"
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="manager-email">Email*</Label>
            <Input
              required
              type="email"
              name="manager-email"
              className="w-full p-6 rounded"
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="manager-phone">Phone*</Label>
            <Input
              required
              type="text"
              name="manager-phone"
              className="w-full p-6 rounded"
            />
          </div>
          <div className="flex w-full space-y-3 mt-4 gap-4">
            <div className="w-1/2">
              <MFButtonSecondary
                label="Previous"
                leadingIcon={ArrowLeft}
                className="w-full"
                onClick={() => {
                  setCurrentStep(1);
                }}
              />
            </div>
            <div className="w-1/2">
              <MFButton
                label="Next"
                trailingIcon={ArrowRight}
                className="w-full"
                onClick={() => {
                  setCurrentStep(3);
                }}
              />
            </div>
          </div>
        </>
      ) : currentStep == 3 ? (
        <>
          <h3 className="text-2xl font-bold uppercase">Upload Documents</h3>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="manager-name">Business Registration*</Label>
            {dataBRFile ? (
              <MFFileUploadedBox
                fileName={dataBRFile.name}
                size={dataBRFile.size}
                onClick={() => setDataBRFile(null)}
              />
            ) : (
              <MFUploadArea
                setDataFile={(file) => setDataBRFile(file)}
                uploadLimitInMB={3}
                acceptedFileExt={acceptedFileExts}
              />
            )}
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="manager-email">Manager NIC/Passport*</Label>
            {dataIDFile ? (
              <MFFileUploadedBox
                fileName={dataIDFile.name}
                size={dataIDFile.size}
                onClick={() => setDataIDFile(null)}
              />
            ) : (
              <MFUploadArea
                setDataFile={(file) => setDataIDFile(file)}
                uploadLimitInMB={3}
                acceptedFileExt={acceptedFileExts}
              />
            )}
          </div>
          <div className="flex w-full space-y-3 mt-4 gap-4">
            <div className="w-1/2">
              <MFButtonSecondary
                label="Previous"
                leadingIcon={ArrowLeft}
                className="w-full"
                onClick={() => {
                  setCurrentStep(2);
                }}
              />
            </div>
            <div className="w-1/2">
              <MFButton
                label="Next"
                trailingIcon={ArrowRight}
                className="w-full"
                onClick={() => {
                  setCurrentStep(4);
                }}
              />
            </div>
          </div>
        </>
      ) : currentStep == 4 ? (
        <>
          <h3 className="text-2xl font-bold uppercase">Set Account Password</h3>

          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="password">Password*</Label>
            <MFPasswordInput
              isCovered={isCovered}
              setIsCovered={setIsCovered}
              value={password1}
              onChange={(val) => setPassword1(val)}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Label htmlFor="password">Confirm Password*</Label>
            <MFPasswordInput
              isCovered={isCovered}
              setIsCovered={setIsCovered}
              value={password2}
              onChange={(val) => setPassword2(val)}
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex w-full space-y-3 mt-4 gap-4">
            <div className="w-1/2">
              <MFButtonSecondary
                label="Previous"
                leadingIcon={ArrowLeft}
                className="w-full"
                onClick={() => {
                  setCurrentStep(2);
                }}
              />
            </div>
            <div className="w-1/2">
              <MFButton
                label="Next"
                trailingIcon={ArrowRight}
                className="w-full"
                onClick={() => {
                  setCurrentStep(5);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold uppercase">Confirm your details</h3>

          <div className="flex w-full space-y-3 mt-4 gap-4">
            <div className="w-1/2">
              <MFButtonSecondary
                label="Previous"
                leadingIcon={ArrowLeft}
                className="w-full"
                onClick={() => {
                  setCurrentStep(3);
                }}
              />
            </div>
            <div className="w-1/2">
              <MFButton
                label="Register Now"
                trailingIcon={ArrowRight}
                className="w-full"
                onClick={() => {
                  alert("submitted");
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
