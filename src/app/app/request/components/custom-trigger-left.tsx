import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import { Button } from "@/app/components/shadcn/button";

export function CustomTriggerLeft() {
  const toggleLeft = useSidebarStore((state) => state.toggleLeft);
  return (
    <Button onClick={toggleLeft} variant="ghost">
      S
    </Button>
  );
}
