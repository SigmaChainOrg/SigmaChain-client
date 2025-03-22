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
  onChange,
  children,
}: {
  selectDefault: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => any; // Llama a esta función cuando se selecciona una opción
  children?: React.ReactNode; // Agregamos children como una propiedad opcional
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string>(""); // Maneja el estado interno del valor seleccionado

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : selectDefault}
          {children && <span className="ml-2">{children}</span>}{" "}
          {/* Renderiza los children */}
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
                  onSelect={() => {
                    setSelectedValue(option.value); // Actualiza el estado interno
                    setOpen(false); // Cierra el menú
                    onChange && onChange(option.value); // Llama a la función onChange pasada como prop
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue === option.value
                        ? "opacity-100"
                        : "opacity-0",
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
