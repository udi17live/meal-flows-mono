import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface MFButtonProps {
  label: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function MFButton({
  label,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onClick,
  className = "",
  disabled = false,
}: MFButtonProps) {
  const classes = `bg-mf-blue hover:bg-mf-blue/90 dark:hover:opacity-90 hover:text-mf-green text-mf-green dark:hover:text-mf-blue ${className}`;
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`flex gap-5 items-center justify-between py-6 px-8 rounded uppercase font-bold disabled:pointer-events-auto disabled:cursor-not-allowed cursor-pointer tracking-widest ${classes}"`}
    >
      {LeadingIcon && <LeadingIcon className=" h-5 w-5" aria-hidden />}
      {label}
      {TrailingIcon && <TrailingIcon className=" h-5 w-5" aria-hidden />}
    </Button>
  );
}
