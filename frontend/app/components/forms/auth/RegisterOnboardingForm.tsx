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
import z, { string } from "zod";
import { acceptedFileExts, cuisineTypes, passwordRules } from "@/app/constants";
import FormOutputDisplay from "../FormOutputDisplay";
import MFPhoneInput from "../input/MFPhoneInput";

export default function RegisterOnboardingForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCoveredPW1, setIsCoveredPW1] = useState(true);
  const [isCoveredPW2, setIsCoveredPW2] = useState(true);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      restaurantName: "",
      restaurantEmail: "",
      restaurantType: "",
      restaurantPhone: "",
      restaurantCuisine: "",
      managerName: "",
      managerEmail: "",
      managerPhone: "",
      dataBRFile: null,
      dataIDFile: null,
      password1: "",
      password2: "",
    },
  });
  const { watch, setValue, formState, handleSubmit, setError, clearErrors } =
    form;
  const values = watch();

  // Validate Each Step
  const isStep1Valid = onboardingSchema
    .pick({
      restaurantName: true,
      restaurantEmail: true,
      restaurantPhone: true,
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

  const isPasswordMatched = () => {
    return values.password1 === values.password2;
  };

  const isValidPasswordSet = () => {
    if (!isStep4Valid) return false;
    return isPasswordMatched();
  };

  const handleNextStepFromStep4 = () => {
    const isMatched = isPasswordMatched();

    if (!isMatched) {
      setError("password2", {
        type: "manual",
        message: "Passwords did not match",
      });
      return;
    }

    clearErrors("password2");
    setCurrentStep(5);
  };

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

  const onSubmit = (values: z.infer<typeof onboardingSchema>) => {
    console.log(values);
    alert("Submitted");
  };

  const _handleOpenFileInNewTab = (file: File | null) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");

    setTimeout(() => URL.revokeObjectURL(fileURL), 100);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 w-full"
      >
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
              <Label htmlFor="restaurantPhone">Email*</Label>
              <Controller
                control={form.control}
                key="restaurantPhone"
                name="restaurantPhone"
                render={({ field }) => {
                  return (
                    <MFPhoneInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
              {formState.errors.managerPhone && (
                <FormFieldErrors
                  error={formState.errors.managerPhone.message}
                />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="restaurant-type">Type*</Label>
              <Controller
                control={form.control}
                key="restaurantType"
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
                options={cuisineTypes}
                onSelect={(value) => setValue("restaurantCuisine", value)}
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
              <Controller
                control={form.control}
                key="managerPhone"
                name="managerPhone"
                render={({ field }) => {
                  return (
                    <MFPhoneInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
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
                key="dataBRFile"
                name="dataBRFile"
                control={form.control}
                render={({ field }) =>
                  field.value ? (
                    <MFFileUploadedBox
                      fileName={field.value.name}
                      size={field.value.size}
                      onClick={() => field.onChange(null)}
                      openFile={() => {
                        _handleOpenFileInNewTab(field.value);
                      }}
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
              {formState.errors.dataBRFile && (
                <FormFieldErrors error={formState.errors.dataBRFile.message} />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="dataIDFile">Manager NIC/Passport*</Label>
              <Controller
                key="dataIDFile"
                name="dataIDFile"
                control={form.control}
                render={({ field }) =>
                  field.value ? (
                    <MFFileUploadedBox
                      fileName={field.value.name}
                      size={field.value.size}
                      onClick={() => field.onChange(null)}
                      openFile={() => {
                        _handleOpenFileInNewTab(field.value);
                      }}
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
              {formState.errors.dataIDFile && (
                <FormFieldErrors error={formState.errors.dataIDFile.message} />
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
                key="password1"
                name="password1"
                control={form.control}
                render={({ field }) => (
                  <MFPasswordInput
                    isCovered={isCoveredPW1}
                    setIsCovered={setIsCoveredPW1}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    placeholder="Enter your password"
                  />
                )}
              />
              {formState.errors.password1 && (
                <FormFieldErrors error={formState.errors.password1.message} />
              )}
            </div>
            <div className="flex flex-col w-full space-y-3">
              <Label htmlFor="password2">Confirm Password*</Label>
              <Controller
                key="password2"
                name="password2"
                control={form.control}
                render={({ field }) => (
                  <MFPasswordInput
                    isCovered={isCoveredPW2}
                    setIsCovered={setIsCoveredPW2}
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    placeholder="Enter your password"
                  />
                )}
              />
              {formState.errors.password2 && (
                <FormFieldErrors error={formState.errors.password2.message} />
              )}
            </div>
            <div className="bg-gray-200 text-sm p-2 rounded">
              <ul>
                {passwordRules.map((rule, index) => {
                  return <li key={index}>-&gt; {rule}</li>;
                })}
              </ul>
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
                  onClick={handleNextStepFromStep4}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold uppercase">
              Confirm your details
            </h3>

            <div className="max-h-[700px] overflow-scroll">
              <div className="py-5">
                <h4 className="text-xl font-bold">Restaurant Details</h4>

                <FormOutputDisplay
                  label="Restaurant Name"
                  value={values.restaurantName}
                />
                <FormOutputDisplay
                  label="Restaurant Email"
                  value={values.restaurantEmail}
                />
                <FormOutputDisplay
                  label="Restaurant Phone"
                  value={values.restaurantPhone}
                />
                <FormOutputDisplay
                  label="Restaurant Type"
                  value={values.restaurantType}
                />
                <FormOutputDisplay
                  label="Restaurant Cuisine"
                  value={values.restaurantCuisine}
                />
              </div>

              <hr />
              <div className="py-5">
                <h4 className="text-xl font-bold">Manager Details</h4>

                <FormOutputDisplay
                  label="Manager Name"
                  value={values.managerName}
                />
                <FormOutputDisplay
                  label="Manager Email"
                  value={values.managerEmail}
                />
                <FormOutputDisplay
                  label="Manager Phone"
                  value={values.managerPhone}
                />
              </div>
              <hr />

              <div className="py-5">
                <h4 className="text-xl font-bold">Documents</h4>

                <FormOutputDisplay
                  label="Busines Registration Uploaded?"
                  value={values.dataBRFile ? "Yes" : "No"}
                />
                <FormOutputDisplay
                  label="Manager ID Uploaded?"
                  value={values.dataIDFile ? "Yes" : "No"}
                />
              </div>

              <hr />

              <div className="py-5">
                <h4 className="text-xl font-bold">Account Details</h4>

                <FormOutputDisplay
                  label="Account Email"
                  value={values.restaurantEmail}
                />
                <FormOutputDisplay
                  label="Account Password Set?"
                  value={isValidPasswordSet() ? "Yes" : "No"}
                />
              </div>
            </div>

            <div className="flex w-full space-y-3 mt-4 gap-4">
              <div className="w-1/2">
                <MFButtonSecondary
                  label="Previous"
                  leadingIcon={ArrowLeft}
                  className="w-full"
                  onClick={() => {
                    setCurrentStep(4);
                  }}
                />
              </div>
              <div className="w-1/2">
                <MFButton
                  label="Register Now"
                  trailingIcon={ArrowRight}
                  className="w-full"
                  type="submit"
                />
              </div>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
}
