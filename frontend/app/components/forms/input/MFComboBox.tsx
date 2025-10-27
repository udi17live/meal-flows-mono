"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDown } from "lucide-react";

interface MFComboBoxProps {
  options: Array<{ value: string; label: string }>;
  selection: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
  searchPlaceHolder?: string;
}

export default function MFComboBox({
  options,
  selection,
  onSelect,
  isOpen,
  setIsOpen,
  placeholder = "Select ...",
  searchPlaceHolder = "Search ...",
}: MFComboBoxProps) {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full p-6 justify-between rounded"
        >
          {selection
            ? options.find((cuisine) => cuisine.value === selection)?.label
            : placeholder}
          <ChevronDown className="ml-2 h-6 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="px-4 py-2 rounded"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput placeholder={searchPlaceHolder} />
          <CommandList>
            <CommandEmpty>Cuisine not found.</CommandEmpty>
            <CommandGroup>
              {options.map((cuisine) => (
                <CommandItem
                  key={cuisine.value}
                  value={cuisine.value}
                  onSelect={(value) => {
                    onSelect(value);
                    setIsOpen(false);
                  }}
                >
                  <CheckIcon
                    className={`
                              "mr-2 h-4 w-4",
                              ${
                                selection === cuisine.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }
                            `}
                  />
                  {cuisine.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
