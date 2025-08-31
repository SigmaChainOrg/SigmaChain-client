"use client";
import { ActivityProcessStatus } from "@/app/app/request/components/activity-process-status";
import { Field, InformationField } from "@/app/app/request/components/field";
import { SaveGroup } from "@/app/app/request/components/save-group";
import { useRequestPatternStore } from "@/app/app/request/state/activityItem";
import { useRequestProcessStore } from "@/app/app/request/state/request-process-store";
import { useUserProfileStore } from "@/app/app/state/use-user-profile-store";
import { BreadcrumbHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/shadcn/accordion";
import { Card, CardContent } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/shadcn/tabs";
import { Textarea } from "@/app/components/shadcn/textarea";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RequestProcess() {
  const pathName = usePathname();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setActivityField = useRequestPatternStore((state) => state.setActivityField);
  const name = useRequestPatternStore((state) => state.name);
  const fields = useRequestPatternStore((state) => state.fields);
  const activities = useRequestPatternStore((state) => state.activities);

  const useExample =
    !name || !fields || fields.length === 0 || !activities || activities.length === 0;

  const displayFields = useExample ? requestExample.fields : fields;
  const displayActivities = useExample ? requestExample.activities : activities;

  const setActivities = useRequestProcessStore((state) => state.setActivities);
  const activeTab = useRequestProcessStore((state) => state.activeTab);
  const setIsCompleteActivity = useRequestProcessStore((state) => state.setIsCompleteActivity);
  const setActiveTab = useRequestProcessStore((state) => state.setActiveTab);

  useEffect(() => {
    setActivities(displayActivities);
  }, [displayActivities, setActivities]);

  const saveButtons = {
    secondary: { value: "Guardar", onClick: () => {} },
    primary: {
      value: "Enviar",
      onClick: () => {
        setIsCompleteActivity(activeTab, true);
        setActivityField(activeTab, "isCompleted", true);
      },
    },
  };

  const activityInformation = displayFields.reduce(
    (acc, field, idx) => {
      acc[`field${idx}`] = { name: field.name, value: field.value };
      return acc;
    },
    {} as Record<string, { name: string; value: string | string[] }>,
  );

  return (
    <>
      <BreadcrumbHeader estado={true} path={pathName} />
      <MainContent>
        <Tabs
          defaultValue={displayActivities[0].id}
          onValueChange={(id) => {
            setActiveTab(id);
          }}
          className="col-start-1 col-end-13 mx-[-16px]"
        >
          <TabsList className="w-full">
            {displayActivities.map((activity) => (
              <TabsTrigger key={activity.id} complete={activity.isCompleted} value={activity.id}>
                {activity.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {displayActivities.map((activity, idx) => {
            if (userProfile === "requester" && idx > 0) {
              return (
                <TabsContent key={activity.id} value={activity.id} className="grid grid-cols-12">
                  <ActivityProcessStatus status={false} className="col-start-2 col-end-12 my-6" />
                </TabsContent>
              );
            }
            if (userProfile === "reviewer" && idx < 1) {
              return (
                <TabsContent key={activity.id} value={activity.id} className="grid grid-cols-12">
                  <ActivityProcessStatus status={true} className="col-start-2 col-end-12 my-6" />
                </TabsContent>
              );
            }
            return (
              <TabsContent key={activity.id} value={activity.id} className="grid grid-cols-12">
                <Card variant="solicitude" className="col-start-2 col-end-12 my-6 py-0">
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="info-item">
                        <AccordionTrigger className="text-h4 font-bold" chevronClassName="size-6">
                          Información general de la actividad
                        </AccordionTrigger>
                        <AccordionContent>
                          {Object.entries(activityInformation).map(([key, info]) => (
                            <InformationField
                              key={key}
                              fieldData={{
                                name: info.name,
                                description: Array.isArray(info.value)
                                  ? info.value.join(", ")
                                  : info.value,
                              }}
                            />
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card variant="solicitude" className="col-start-2 col-end-12 py-0">
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="fields-item">
                        <AccordionTrigger className="text-h4 font-bold" chevronClassName="size-6">
                          Campos de la actividad
                        </AccordionTrigger>
                        <AccordionContent>
                          {Array.isArray(activity.sections) &&
                            activity.sections.map((section) => (
                              <Field
                                key={section.id}
                                fieldData={{
                                  name: section.name,
                                  description: section.description ? section.description : "",
                                }}
                              >
                                {section.fields.map((field) => (
                                  <Field
                                    key={field.id}
                                    fieldData={{
                                      name: field.name,
                                      description: field.description ? field.description : "",
                                    }}
                                  >
                                    <div>
                                      {field.type === "text" ? (
                                        <Input
                                          placeholder="tu texto aquí"
                                          onChange={(e) => {
                                            /* setFieldValue(field.order, [e.target.value]) */
                                          }}
                                        />
                                      ) : field.type === "combobox" ? (
                                        <Combobox
                                          selectDefault={{
                                            value: "add group",
                                            label: "Agregar grupo",
                                          }}
                                          options={[]}
                                          onChange={(option) => {
                                            /* ... */
                                          }}
                                        />
                                      ) : field.type === "textarea" ? (
                                        <Textarea
                                          placeholder="tu texto aquí"
                                          onChange={(e) => {
                                            /* setFieldValue(field.order, [e.target.value]) */
                                          }}
                                        />
                                      ) : null}
                                    </div>
                                  </Field>
                                ))}
                              </Field>
                            ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
        <SaveGroup className="col-start-2 col-end-12 place-self-end" buttons={saveButtons} />
      </MainContent>
    </>
  );
}
const requestExample = {
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
      isCompleted: false,
      error: {},
      sections: [
        {
          id: "S1",
          order: 1,
          prevOrder: undefined,
          name: "Sección 1",
          description: "En esta sección se recopilan los datos del solicitante",
          fields: [
            {
              id: "f1",
              order: 1,
              name: "Nombre estudiante",
              description: "Nombre completo del estudiante solicitante",
              type: "text",
              optional: false,
              error: {},
            },
            {
              id: "f2",
              order: 2,
              name: "Grupo solicitante",
              description: "Selecciona el grupo solicitante",
              type: "combobox",
              options: ["Estudiantes", "Docentes", "Ingeniería"],
              optional: false,
              error: {},
            },
          ],
        },
      ],
    },
    {
      id: "a2",
      order: 2,
      name: "Emisión de carta",
      reviewerGroup: "",
      responsable: "",
      isCompleted: false,
      error: {},
      sections: [
        {
          id: "S3",
          order: 2,
          prevOrder: 1,
          name: "Sección de emisión",
          description: "En esta sección se recopilan los datos de emisión",
          fields: [
            {
              id: "f1",
              order: 1,
              name: "Motivo",
              description: "Motivo de la solicitud",
              type: "textarea",
              optional: false,
              error: {},
            },
          ],
        },
      ],
    },
    {
      id: "a3",
      order: 3,
      name: "Validación de requisitos",
      reviewerGroup: "",
      responsable: "",
      isCompleted: false,
      error: {},
      sections: [
        {
          id: "S1",
          order: 1,
          prevOrder: undefined,
          name: "Sección 1",
          description: "En esta sección se validan requisitos",
          fields: [
            {
              id: "f1",
              order: 1,
              name: "Requisitos",
              description: "Lista de requisitos validados",
              type: "text",
              optional: false,
              error: {},
            },
          ],
        },
      ],
    },
  ],
};
