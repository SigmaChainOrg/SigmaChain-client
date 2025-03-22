"use client";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/shadcn/utils";

export function SaveGroup({
  buttons,
  className,
}: {
  buttons: {
    secondary: { value: string; onClick: (...args: any[]) => any }; // Generalizamos el tipo de función
    primary: { value: string };
  };
  className?: string; // Agregamos className como una propiedad opcional
}) {
  return (
    <div
      className={cn("flex flex-row justify-center gap-4 px-5 py-6", className)}
    >
      <Button variant="secondary" onClick={buttons.secondary.onClick}>
        {buttons.secondary.value}
      </Button>
      <Button type="submit">{buttons.primary.value}</Button>
    </div>
  );
}
