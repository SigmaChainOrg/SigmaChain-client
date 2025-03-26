"use client";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { cn } from "@/features/shadcn/services/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check } from "lucide-react";
import * as React from "react";

export function Combobox({
  selectDefault = "Seleccionar",
  options,
  onChange,
  children,
}: {
  selectDefault?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (option: { value: string; label: string }) => any; // Llama a esta función cuando se selecciona una opción
  children?: React.ReactNode; // Agregamos children como una propiedad opcional
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string>(""); // Maneja el estado interno del valor seleccionado
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span
            className="truncate overflow-hidden whitespace-nowrap"
            title={
              selectedValue
                ? options.find((option) => option.value === selectedValue)
                    ?.label
                : selectDefault
            } // Muestra el texto completo al pasar el cursor
          >
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : selectDefault}
          </span>
          {/* Renderiza los children */}
          <FontAwesomeIcon icon={faChevronDown} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={selectDefault} />
          <CommandList>
            <CommandEmpty>Ningún resultado</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    setSelectedValue(option.value); // Actualiza el estado interno
                    setOpen(false); // Cierra el menú
                    onChange && onChange(option); // Llama a la función onChange pasada como prop
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
      </PopoverContent>
    </Popover>
  );
}
