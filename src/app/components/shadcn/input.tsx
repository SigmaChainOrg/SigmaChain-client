import * as React from "react";

import { cn } from "@/lib/shadcn/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-6 w-full border-b-2 border-solid border-primary bg-transparent px-2 font-poppins text-md transition-colors file:border-0 file:bg-transparent file:text-md file:font-medium file:text-gray-950 placeholder:text-md placeholder:text-gray-500 focus-visible:border-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex !h-[100px] w-full border-b-2 border-solid border-primary bg-transparent px-2 py-1 font-poppins text-md transition-colors placeholder:text-md placeholder:text-gray-500 focus-visible:border-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
