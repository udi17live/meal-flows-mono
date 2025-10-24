import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface MFButtonProps {
  label: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  bgColor?: string;
  bgColorHover?: string;
  bgColorDark?: string;
  bgColorDarkHover?: string;
  textColor?: string;
  textColorHover?: string;
  textColorDark?: string;
  textColorDarkHover?: string;
  onClick?: () => void;
}

export default function MFButton({
  label,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  bgColor = "bg-mf-blue",
  bgColorHover = "hover:bg-mf-blue/90",
  bgColorDark = "bg-mf-green",
  bgColorDarkHover = "dark:hover:opacity-90",
  textColor = "text-mf-green",
  textColorHover = "hover:text-mf-green",
  textColorDark = "text-mf-blue",
  textColorDarkHover = "dark:hover:text-mf-blue",
  onClick,
}: MFButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`flex gap-5 items-center justify-between py-6 px-8 rounded uppercase font-bold ${bgColor} dark:${bgColorDark} ${textColor} dark:${textColorDark} cursor-pointer tracking-widest ${bgColorHover} ${bgColorDarkHover} ${textColorHover} ${textColorDarkHover}`}
    >
      {LeadingIcon && <LeadingIcon className=" h-5 w-5" aria-hidden />}
      {label}
      {TrailingIcon && <TrailingIcon className=" h-5 w-5" aria-hidden />}
    </Button>
  );
}
