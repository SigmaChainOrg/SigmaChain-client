"use client";
import { Field } from "@/app/solicitudes/components/field";
import { ActivityItem } from "@/app/solicitudes/components/manager/activityItem";
import { SaveGroup } from "@/app/solicitudes/components/save-group";
import { useActivityStore } from "@/app/solicitudes/utils/zustand/activityItem";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Combobox } from "@/components/shadcn/combobox";
import { BreadcrumbHeader } from "@/components/shadcn/header";
import { Input, Textarea } from "@/components/shadcn/input";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";

const solicitudeData = {
  fieldOne: {
    name: "Descripción",
    description:
      "Coloque una descripción de la solicitud. Esta descripción será vista por los revisores y los solicitantes de la solicitud.",
    tipo: "textarea",
  },
  fieldTwo: {
    name: "Grupo solicitante",
    description:
      "Escoja el grupo de usuarios que podrán iniciar una solicitud.",
    tipo: "combobox",
    options: ["Grupo a", "Grupo b", "Grupo c"],
  },
};

export default function Solicitudes() {
  const pathName = usePathname();
  const { activities, addActivity } = useActivityStore();
  const saveButtons = {
    secondary: { value: "Cancelar", onClick: () => {} },
    primary: { value: "Guardar", onClick: () => {} },
  };
  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <Card
        variant="solicitude"
        className="col-start-3 col-end-11 md:col-start-2 md:col-end-12"
      >
        <CardHeader>
          <Input
            placeholder="Nombre de la solicitud"
            className="!text-h3 placeholder:!text-h3 focus:!text-h3"
          />
        </CardHeader>
        <CardContent>
          {Object.entries(solicitudeData).map(([key, fieldData]) => (
            <Field key={key} fieldData={fieldData}>
              {fieldData.tipo === "text" ? (
                <Input placeholder="tu texto aquí" />
              ) : fieldData.tipo === "combobox" ? (
                <Combobox
                  selectDefault="Seleccione un grupo"
                  options={[{ value: "ingenieria", label: "Ingeniería" }]}
                />
              ) : (
                fieldData.tipo === "textarea" && (
                  <Textarea placeholder="tu texto aquí" />
                )
              )}
            </Field>
          ))}
          <div className="mt-4 flex w-full flex-row items-center justify-between">
            <h4 className="font-poppins">
              {" "}
              Actividades para completar la solicitud
            </h4>
            <Button variant="secondary"> Visualizar flujo </Button>
          </div>
          <Separator
            orientation="horizontal"
            className="mt-[-12px] h-[1px] w-full bg-primary"
          />
          <div className="flex w-full flex-col gap-1">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </div>
          <Button
            variant="secondary"
            className="place-self-end"
            onClick={addActivity}
          >
            Añadir actividad
          </Button>
        </CardContent>
      </Card>
      <SaveGroup
        className="col-start-3 col-end-12 place-self-end"
        buttons={saveButtons}
      />
    </>
  );
}
