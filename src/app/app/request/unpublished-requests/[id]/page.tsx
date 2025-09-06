"use client";
import { ActivityItemView } from "@/app/app/request/components/activity-item-manager";
import { InformationField } from "@/app/app/request/components/field";
import { SaveGroup } from "@/app/app/request/components/save-group";
import { BreadcrumbHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent } from "@/app/components/shadcn/card";
import { useGetRequestPatternsId } from "@/features/request-pattern/hooks/use-get-request-patterns-id";
import { Separator } from "@radix-ui/react-separator";
import { useParams, usePathname } from "next/navigation";

const requestsExamples = [
  {
    id: "req-1",
    name: "Matrícula estudiantes",
    description: "Proceso de matrícula para estudiantes nuevos y antiguos.",
    isPublished: false,
    startDate: new Date("2023-10-01"),
    fields: [
      {
        id: "desc-req-1",
        name: "Descripción",
        value: "Proceso de matrícula para estudiantes nuevos y antiguos.",
      },
      {
        id: "group-req-1",
        name: "Grupo solicitante",
        value: "Estudiantes",
      },
    ],
    activities: [
      {
        id: "a1",
        order: 1,
        name: "Revisión de solicitud",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
      {
        id: "a2",
        order: 2,
        name: "Emisión de carta",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
    ],
  },
  {
    id: "req-4",
    name: "Adición de materias",
    description: "Proceso para añadir materias al plan de estudios.",
    isPublished: false,
    startDate: new Date("2023-10-01"),
    fields: [
      {
        id: "desc-req-4",
        name: "Descripción",
        value: "Proceso para añadir materias al plan de estudios.",
      },
      {
        id: "group-req-4",
        name: "Grupo solicitante",
        value: "Estudiantes",
      },
    ],
    activities: [
      {
        id: "a1",
        order: 1,
        name: "Revisión de solicitud",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
      {
        id: "a2",
        order: 2,
        name: "Emisión de carta",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
    ],
  },
  {
    id: "req-2",
    name: "Solicitud carta aval institucional",
    description: "Solicitud para obtener una carta aval institucional.",
    isPublished: false,
    startDate: new Date("2023-10-01"),
    fields: [
      {
        id: "desc-req-2",
        name: "Descripción",
        value: "Solicitud para obtener una carta aval institucional.",
      },
      {
        id: "group-req-2",
        name: "Grupo solicitante",
        value: "Estudiantes",
      },
    ],
    activities: [
      {
        id: "a1",
        order: 1,
        name: "Revisión de solicitud",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
      {
        id: "a2",
        order: 2,
        name: "Emisión de carta",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
    ],
  },
];

export default function Solicitudes() {
  const { id } = useParams();
  const pathName = usePathname();

  const { data: requestPatternData } = useGetRequestPatternsId(id as string, {
    include_activities: true,
    include_groups: true,
  });

  const displayFields = [
    {
      id: "desc-req-1",
      name: "Descripción",
      value: requestPatternData?.description || "Sin descripción",
    },
    {
      id: "group-req-1",
      name: "Grupos solicitantes",
      value:
        requestPatternData?.groups && requestPatternData.groups.length > 0
          ? requestPatternData.groups.map((group) => group.name)
          : "No hay grupos asignados",
    },
  ];

  const saveButtons = {
    secondary: { value: "Editar", onClick: () => {} },
    primary: { value: "Publicar", onClick: () => {} },
  };

  return (
    <>
      <BreadcrumbHeader estado={true} path={pathName} />
      <MainContent>
        <Card variant="solicitude" className="col-start-3 col-end-11 md:col-start-2 md:col-end-12">
          <CardContent>
            <h3>{requestPatternData?.label}</h3>
            {displayFields.map((field) => (
              <InformationField
                key={field.id}
                fieldData={{
                  name: field.name,
                  description: Array.isArray(field.value)
                    ? field.value.join(", ")
                    : String(field.value ?? ""),
                }}
              />
            ))}
            <div className="mt-4 flex w-full flex-row items-center justify-between">
              <h4 className="font-poppins"> Actividades para completar la solicitud</h4>
              <Button variant="secondary"> Visualizar flujo </Button>
            </div>
            <Separator orientation="horizontal" className="mt-[-12px] h-[1px] w-full bg-primary" />
            <div className="flex w-full flex-col gap-1">
              {requestPatternData?.activities?.map((activity) => (
                <ActivityItemView
                  key={activity.activityId}
                  requestId={"" + id}
                  activity={{
                    id: activity.activityId,
                    name: activity.label,
                    order: activity.activityOrder,
                    reviewerGroup:
                      activity.assignee?.assigneeType === "requester"
                        ? "Solicitante"
                        : activity.assignee?.groupId || "Test Group",
                    responsable:
                      activity.assignee?.assigneeType === "group"
                        ? activity.assignee?.groupId || ""
                        : activity.assignee?.userId || "",
                    error: {},
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <SaveGroup className="col-start-3 col-end-12 place-self-end" buttons={saveButtons} />
      </MainContent>
    </>
  );
}
