"use client";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js";

interface MFPhoneInputProps {
  value: string;
  onChange: (val: E164Number | "") => void;
}

export default function MFPhoneInput({ value, onChange }: MFPhoneInputProps) {
  return (
    <>
      <PhoneInput
        className="w-full py-3 px-6 rounded border text-sm"
        placeholder="Enter phone number"
        value={value}
        onChange={(val) => {
          onChange(val ?? "");
        }}
        error={
          value
            ? isPossiblePhoneNumber(value)
              ? undefined
              : "Invalid phone number"
            : "Phone number required"
        }
        addInternationalOption
        international
        defaultCountry="LK"
        withCountryCallingCode
        smartCaret
        countryCallingCodeEditable={false}
      />
    </>
  );
}
