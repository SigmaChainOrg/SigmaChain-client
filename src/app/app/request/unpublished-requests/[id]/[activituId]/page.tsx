"use client";
import { LabeledSwitch } from "@/app/components/labeled-switch";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
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
    </>
  );
}
