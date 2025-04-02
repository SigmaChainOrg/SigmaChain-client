"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/features/shadcn/services/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer focus-visible:border-ring dark:data-[state=unchecked]:bg-input/80 inline-flex h-5 w-[48px] shrink-0 items-center rounded-full border-[2px] border-primary shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full transition-transform data-[state=checked]:translate-x-[calc(150%)] data-[state=checked]:bg-secondary data-[state=unchecked]:translate-x-1 data-[state=unchecked]:bg-primary",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
