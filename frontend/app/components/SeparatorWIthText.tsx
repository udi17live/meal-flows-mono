import { Separator } from "@/components/ui/separator";

interface SeperatorWithTextProps {
  text: string;
}

export default function SeparatorWithText({ text }: SeperatorWithTextProps) {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <span className="text-muted-foreground">{text}</span>
      <Separator className="flex-1" />
    </div>
  );
}
