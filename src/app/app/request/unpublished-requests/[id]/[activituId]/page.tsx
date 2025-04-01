"use client";
import { LabeledCheckbox } from "@/app/components/labeled-checkbox";
import { LabeledSwitch } from "@/app/components/labeled-switch";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { Label } from "@/app/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/shadcn/radio-group";
import { useParams, usePathname } from "next/navigation";

export default function Home() {
  const { activityId } = useParams();
  const pathName = usePathname();
  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
        <LabeledSwitch label="Prueba" side="left" />
      </div>
      <div className="col-start-1 col-end-13">
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="col-start-1 col-end-13">
        <LabeledCheckbox label="Prueba" side="right" />
      </div>
    </>
  );
}
