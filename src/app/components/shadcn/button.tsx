import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/shadcn/utils";

const buttonVariants = cva(
  //Items-center vertical center items
  //justyfy-center horizontal center items
  "inline-flex items-center justify-center gap-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-background font-poppins font-bold py-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-secondary dark:bg-background dark:hover:bg-gray-50/90 focus-visible:ring-secondary",
        danger:
          "bg-danger text-white shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:hover:bg-red-900/90 focus-visible:ring-danger focus-visible:opacity-60",
        secondary:
          "bg-background text-primary border-solid border-2 border-primary hover:border-secondary hover:text-secondary focus-visible:ring-complementary",
        ghost:
          "[&>svg]:text-primary [&>svg]:hover:text-secondary !w-dark:hover:bg-gray-800 !px-1 hover:bg-background focus-visible:ring-complementary focus:bg-background py-1",
        icon: "",
        combobox:
          "rounded-[0px] w-full text-md border-solid border-b-2 border-primary bg-transparent",
        link: "text-complement text-md underline-offset-4 hover:underline",
      },
      size: {
        default: "h-6 px-4",
        sm: "h-6 px-3",
        lg: "h-7 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
