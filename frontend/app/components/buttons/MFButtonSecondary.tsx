import MFButton from "@/app/components/buttons/MFButton";
import { LucideIcon } from "lucide-react";

interface MFButtonSecondaryProps {
  label: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export default function MFButtonSecondary({
  label,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onClick,
  className = "",
}: MFButtonSecondaryProps) {
  const classes = `bg-gray-200 text-mf-blue hover:bg-gray-300/90 hover:text-mf-blue hover:opacity-90 ${className}`;
  return (
    <MFButton
      label={label}
      leadingIcon={LeadingIcon}
      trailingIcon={TrailingIcon}
      className={classes}
      onClick={onClick}
    />
  );
}
