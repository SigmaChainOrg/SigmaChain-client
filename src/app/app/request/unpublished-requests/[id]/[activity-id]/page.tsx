"use client";
import { SectionCard } from "@/app/app/request/components/form-card";
import { useActivityFormStore } from "@/app/app/request/state/activity-form-field-store";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { useParams, usePathname } from "next/navigation";

export default function ActivityFormPattern() {
  const { activityId } = useParams();
  const pathName = usePathname();

  const sections = useActivityFormStore((state) => state.sections);

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <div className="col-start-3 col-end-11 flex flex-col gap-6">
        {sections.map((section, index) => (
          <div key={index}>
            <SectionCard section={section} />

            {/*            <FormCard
              key={`form-${component.id}`}
              addClick={() => addFormCard(index)} // Pasa el índice actual para agregar debajo
              addSectionClick={() => addSectionCard(index)} // Pasa el índice actual para agregar debajo
              deleteClick={() => deleteComponent(component.id)} // Pasa la función para eliminar
            />*/}
          </div>
        ))}
      </div>
    </>
  );
}
