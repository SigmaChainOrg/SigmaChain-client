import { Checkbox } from "@/app/components/shadcn/checkbox";
import { Label } from "@/app/components/shadcn/label";

export function LabeledCheckbox({ side, label }: { side: string; label: string }) {
  return (
    <>
      {side === "left" && (
        <div className="flex items-center space-x-2">
          <Label>{label}</Label>
          <Checkbox id="terms" />
        </div>
      )}
      {side === "right" && (
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label>{label}</Label>
        </div>
      )}
    </>
  );
}
