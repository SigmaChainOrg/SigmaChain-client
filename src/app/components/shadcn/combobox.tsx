"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/shadcn/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Combobox({
  selectDefault,
  options,
}: {
  selectDefault: string;
  options: Array<{ value: string; label: string }>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : selectDefault}
          <FontAwesomeIcon icon={faChevronDown} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="w-[--radix-popper-anchor-width]"
      >
        <Command>
          <CommandInput placeholder={selectDefault} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
