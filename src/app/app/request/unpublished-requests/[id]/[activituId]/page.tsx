"use client";
import { FormCard } from "@/app/app/request/components/form-card";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";

import { SectionCard } from "@/app/app/request/components/section-card";
import { useParams, usePathname } from "next/navigation";

export default function Home() {
  const { activityId } = useParams();
  const pathName = usePathname();
  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <div className="col-start-3 col-end-11 flex flex-col gap-6">
        <FormCard type="" />
        <SectionCard type="" />
      </div>
    </>
  );
}
