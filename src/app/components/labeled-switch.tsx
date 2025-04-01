import { Label } from "@/app/components/shadcn/label";
import { Switch } from "@/app/components/shadcn/switch";

export function LabeledSwitch({ side, label }: { side: string; label: string }) {
  return (
    <>
      {side === "left" && (
        <div className="flex items-center space-x-2">
          <Label>{label}</Label>
          <Switch id="airplane-mode" />
        </div>
      )}
      {side === "right" && (
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label>{label}</Label>
        </div>
      )}
    </>
  );
}
