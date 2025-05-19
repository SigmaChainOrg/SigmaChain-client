"use client";
import { Button } from "@/app/components/shadcn/button";
import { cn } from "@/features/shadcn/services/utils";

export function SaveGroup({
  buttons,
  className,
}: {
  buttons: {
    secondary: { value: string; onClick: (...args: any[]) => any };
    primary: { value: string; onClick: (...args: any[]) => any };
  };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row justify-center gap-4 px-5 py-6", className)}>
      <Button variant="secondary" onClick={buttons.secondary.onClick}>
        {buttons.secondary.value}
      </Button>
      <Button type="submit" onClick={buttons.primary.onClick}>
        {buttons.primary.value}
      </Button>
    </div>
  );
}
