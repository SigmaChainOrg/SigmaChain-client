import { Checkbox } from "@/app/components/shadcn/checkbox";
import { Label } from "@/app/components/shadcn/label";

export function LabeledCheckbox({
  side,
  label,
  checked,
  onChange,
}: {
  side: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <>
      {side === "left" && (
        <div className="flex items-center space-x-2">
          <Label>{label}</Label>
          <Checkbox id="terms" checked={checked} onCheckedChange={onChange} />
        </div>
      )}
      {side === "right" && (
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={checked} onCheckedChange={onChange} />
          <Label>{label}</Label>
        </div>
      )}
    </>
  );
}
