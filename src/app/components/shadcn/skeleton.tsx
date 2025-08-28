import { cn } from "@/features/shadcn/services/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-[#e8e9ea]", className)}
      {...props}
    />
  );
}

export { Skeleton };
