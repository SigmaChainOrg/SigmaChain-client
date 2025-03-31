import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import { Button } from "@/app/components/shadcn/button";

export function CustomTriggerRight() {
  const toggleRight = useSidebarStore((state) => state.toggleRight);
  return (
    <Button onClick={toggleRight} variant="secondary">
      Gestionar información
    </Button>
  );
}
export function CustomCloseTriggerRight() {
  const toggleRight = useSidebarStore((state) => state.toggleRight);
  return (
    <Button
      onClick={toggleRight}
      variant="ghost"
      className="h-4 w-4 cursor-pointer hover:bg-transparent"
    >
      X
    </Button>
  );
}
