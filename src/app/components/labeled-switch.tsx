import { Label } from "@/app/components/shadcn/label";
import { Switch } from "@/app/components/shadcn/switch";

export function LabeledSwitch({
  side,
  label,
  onChange,
  checked,
}: {
  side: string;
  label: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}) {
  return (
    <>
      {side === "left" && (
        <div className="flex items-center space-x-2">
          <Label>{label}</Label>
          <Switch id="airplane-mode" checked={checked} onCheckedChange={onChange} />
        </div>
      )}
      {side === "right" && (
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={checked} onCheckedChange={onChange} />
          <Label>{label}</Label>
        </div>
      )}
    </>
  );
}
