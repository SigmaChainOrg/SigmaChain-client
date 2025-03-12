import * as React from "react";

import { cn } from "@/lib/shadcn/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-primary file:text-md placeholder:text-md focus-visible:border-secondary font-poppins text-md flex h-6 w-full border-b-2 border-solid bg-transparent px-2 transition-colors file:border-0 file:bg-transparent file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
