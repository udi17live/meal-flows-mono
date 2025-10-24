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
import { useForm, FormProvider, Controller } from "react-hook-form";
import { onboardingSchema } from "@/app/schemas/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldErrors from "../FormFieldErrors";
import z from "zod";

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
  const [currentStep, setCurrentStep] = useState<number>(1);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      restaurantName: "",
      restaurantEmail: "",
      restaurantType: "",
      restaurantCuisine: "",
      managerName: "",
      managerEmail: "",
      managerPhone: "",
      dataBRFile: undefined as unknown as File,
      dataIDFile: undefined as unknown as File,
      password1: "",
      password2: "",
    },
  });
  const { watch, setValue, formState } = form;
  const values = watch();

  // Validate Each Step
  const isStep1Valid = onboardingSchema
    .pick({
      restaurantName: true,
      restaurantEmail: true,
      restaurantType: true,
      restaurantCuisine: true,
    })
    .safeParse(values).success;

  const isStep2Valid = onboardingSchema
    .pick({
      managerName: true,
      managerEmail: true,
      managerPhone: true,
    })
    .safeParse(values).success;

  const isStep3Valid = onboardingSchema
    .pick({
      dataBRFile: true,
      dataIDFile: true,
    })
    .safeParse(values).success;

  const isStep4Valid = onboardingSchema
    .pick({
      password1: true,
      password2: true,
    })
    .safeParse(values).success;

  const acceptedFileExts: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const isNextButtonDisabled = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return !isStep1Valid;
      case 2:
        return !isStep2Valid;
      case 3:
        return !isStep3Valid;
      case 4:
        return !isStep4Valid;
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col space-y-4 w-full">
        {currentStep == 1 ? (
          <>
            <h3 className="text-2xl font-bold uppercase">Restaurant Details</h3>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="restaurant-name">Name*</Label>
              <Input
                required
                type="text"
                className="w-full p-6 rounded"
                placeholder="Your restaurant name"
                {...form.register("restaurantName")}
              />
              {formState.errors.restaurantName && (
                <FormFieldErrors
                  error={formState.errors.restaurantName.message}
                />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="restaurant-email">Email*</Label>
              <Input
                required
                type="email"
                placeholder="Enter your email"
                className="w-full p-6 rounded"
                {...form.register("restaurantEmail")}
              />
              {formState.errors.restaurantEmail && (
                <FormFieldErrors
                  error={formState.errors.restaurantEmail.message}
                />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="restaurant-type">Type*</Label>
              <Controller
                control={form.control}
                name="restaurantType"
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full p-6 rounded">
                        <SelectValue placeholder="Select type ..." />
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
                  );
                }}
              />
              {formState.errors.restaurantType && (
                <FormFieldErrors
                  error={formState.errors.restaurantType.message}
                />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="category">Cuisine*</Label>
              <MFComboBox
                options={cuisines}
                onSelect={(value) =>
                  setValue("restaurantCuisine", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
                selection={values.restaurantCuisine}
                isOpen={isOpen}
                setIsOpen={(isOpen) => setIsOpen(isOpen)}
                placeholder="Select cuisine ..."
                searchPlaceHolder="Search cuisine ..."
              />
              {formState.errors.restaurantCuisine && (
                <FormFieldErrors
                  error={formState.errors.restaurantCuisine.message}
                />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3 mt-4 gap-4">
              <MFButton
                label="Next"
                trailingIcon={ArrowRight}
                className="w-full"
                disabled={isNextButtonDisabled(currentStep)}
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
              <Label htmlFor="managerName">Name*</Label>
              <Input
                required
                type="text"
                className="w-full p-6 rounded"
                {...form.register("managerName")}
              />
              {formState.errors.managerName && (
                <FormFieldErrors error={formState.errors.managerName.message} />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="managerEmail">Email*</Label>
              <Input
                required
                type="email"
                className="w-full p-6 rounded"
                {...form.register("managerEmail")}
              />
              {formState.errors.managerEmail && (
                <FormFieldErrors
                  error={formState.errors.managerEmail.message}
                />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="managerPhone">Phone*</Label>
              <Input
                required
                type="text"
                className="w-full p-6 rounded"
                {...form.register("managerPhone")}
              />
              {formState.errors.managerPhone && (
                <FormFieldErrors
                  error={formState.errors.managerPhone.message}
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
                    setCurrentStep(1);
                  }}
                />
              </div>
              <div className="w-1/2">
                <MFButton
                  label="Next"
                  trailingIcon={ArrowRight}
                  className="w-full"
                  disabled={isNextButtonDisabled(currentStep)}
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
              <Label htmlFor="dataBRFile">Business Registration*</Label>
              <Controller
                name="dataBRFile"
                control={form.control}
                render={({ field }) =>
                  field.value ? (
                    <MFFileUploadedBox
                      fileName={field.value.name}
                      size={field.value.size}
                      onClick={() => field.onChange(null)}
                    />
                  ) : (
                    <MFUploadArea
                      setDataFile={(file) => field.onChange(file)}
                      uploadLimitInMB={3}
                      acceptedFileExt={acceptedFileExts}
                    />
                  )
                }
              />
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="dataIDFile">Manager NIC/Passport*</Label>
              <Controller
                name="dataIDFile"
                control={form.control}
                render={({ field }) =>
                  field.value ? (
                    <MFFileUploadedBox
                      fileName={field.value.name}
                      size={field.value.size}
                      onClick={() => field.onChange(null)}
                    />
                  ) : (
                    <MFUploadArea
                      setDataFile={(file) => field.onChange(file)}
                      uploadLimitInMB={3}
                      acceptedFileExt={acceptedFileExts}
                    />
                  )
                }
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
                  disabled={isNextButtonDisabled(currentStep)}
                  onClick={() => {
                    setCurrentStep(4);
                  }}
                />
              </div>
            </div>
          </>
        ) : currentStep == 4 ? (
          <>
            <h3 className="text-2xl font-bold uppercase">
              Set Account Password
            </h3>

            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="accountEmail">
                Account Email(Same as Restaurant Email)
              </Label>
              <Input
                disabled
                type="text"
                name="account-email"
                className="w-full p-6 rounded"
                value={values.restaurantEmail}
              />
            </div>

            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="password1">Password*</Label>
              <Controller
                name="password1"
                control={form.control}
                render={({ field }) => (
                  <MFPasswordInput
                    isCovered={isCovered}
                    setIsCovered={setIsCovered}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your password"
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="password2">Confirm Password*</Label>
              <Controller
                name="password2"
                control={form.control}
                render={({ field }) => (
                  <MFPasswordInput
                    isCovered={isCovered}
                    setIsCovered={setIsCovered}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your password"
                  />
                )}
              />
            </div>
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
                  label="Next"
                  trailingIcon={ArrowRight}
                  className="w-full"
                  disabled={isNextButtonDisabled(currentStep)}
                  onClick={() => {
                    setCurrentStep(5);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold uppercase">
              Confirm your details
            </h3>

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
      </form>
    </FormProvider>
  );
}
