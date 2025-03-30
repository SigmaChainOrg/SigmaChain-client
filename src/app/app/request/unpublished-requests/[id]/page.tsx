"use client";
import { ActivityItemView } from "@/app/app/request/components/activityItemManager";
import { SaveGroup } from "@/app/app/request/components/save-group";
import { useActivityStore } from "@/app/app/request/state/activityItem";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@/app/components/shadcn/card";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { Separator } from "@radix-ui/react-separator";
import { useParams, usePathname } from "next/navigation";

const solicitudeData = {
  name: "Matricula estudiantes",
  data: {
    fieldOne: {
      name: "Descripción",
      description:
        "Los estudiantes de pregrado de las carreras de la Ucuenca pueden matrcuarse mediante este formulario",
    },
    fieldTwo: {
      name: "Grupo solicitante",
      description: "Ingeniería - Estudiantes",
    },
  },
};

export default function Solicitudes() {
  const { id } = useParams();
  const pathName = usePathname();
  const { activities } = useActivityStore();
  const saveButtons = {
    secondary: { value: "Editar", onClick: () => {} },
    primary: { value: "Publicar" },
  };

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>

      <Card variant="solicitude" className="col-start-3 col-end-11 md:col-start-2 md:col-end-12">
        <CardContent>
          <h3>{solicitudeData.name}</h3>
          {Object.entries(solicitudeData.data).map(([key, fieldData]) => (
            <div key={key}>
              <h5 className="row-start-1">{fieldData.name}</h5>
              <p className="col-start-1 col-end-3 row-start-2 font-raleway">
                {fieldData.description}
              </p>
            </div>
          ))}
          <div className="mt-4 flex w-full flex-row items-center justify-between">
            <h4 className="font-poppins"> Actividades para completar la solicitud</h4>
            <Button variant="secondary"> Visualizar flujo </Button>
          </div>
          <Separator orientation="horizontal" className="mt-[-12px] h-[1px] w-full bg-primary" />
          <div className="flex w-full flex-col gap-1">
            {activities.map((activity) => (
              <ActivityItemView key={activity.id} {...activity} />
            ))}
          </div>
        </CardContent>
      </Card>
      <SaveGroup className="col-start-3 col-end-12 place-self-end" buttons={saveButtons} />
    </>
  );
}
