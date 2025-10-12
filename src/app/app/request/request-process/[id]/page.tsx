"use client";
import { ActivityProcessStatus } from "@/app/app/request/components/activity-process-status";
import { Field, InformationField, Section } from "@/app/app/request/components/field";
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
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import { Separator } from "@/app/components/shadcn/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/shadcn/tabs";
import { Textarea } from "@/app/components/shadcn/textarea";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { optionFieldSchema } from "../../schemas/field-schema";

export default function RequestProcess() {
  const pathName = usePathname();

  const userProfile = useUserProfileStore((state) => state.userProfile);

  const requestName = useRequestPatternStore((state) => state.name);
  const requestActivities = useRequestPatternStore((state) => state.activities);

  const activitiesInTab = useRequestProcessStore((state) => state.activities);
  const setActivitiesInTab = useRequestProcessStore((state) => state.setActivities);
  const activeTab = useRequestProcessStore((state) => state.activeTabId);
  const setActiveTab = useRequestProcessStore((state) => state.setActiveTabId);
  const setIsCompleteActivity = useRequestProcessStore((state) => state.setIsCompleteActivity);

  const useExample = !requestName || !requestActivities || requestActivities.length === 0;

  if (useExample) {
    setActivitiesInTab(requestExample.activities);
  } else {
    setActivitiesInTab(requestActivities);
  }

  // useEffect(() => {
  //   setActivities(displayActivities);
  // }, [displayActivities, setActivities]);

  const saveButtons = {
    secondary: { value: "Guardar", onClick: () => {} },
    primary: {
      value: "Enviar",
      onClick: () => {
        setIsCompleteActivity(activeTab, true);
      },
    },
  };

  return (
    <>
      <BreadcrumbHeader estado={true} path={pathName} />
      <Tabs
        defaultValue={activitiesInTab[0] ? activitiesInTab[0].id : ""}
        onValueChange={(id) => {
          setActiveTab(id);
        }}
        className="flex w-full overflow-auto"
      >
        <TabsList className="mt-6 w-full">
          {activitiesInTab.map((activity) => (
            <TabsTrigger
              className="py-2"
              key={activity.id}
              complete={activity.isCompleted}
              value={activity.id}
            >
              {activity.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <MainContent>
          {activitiesInTab.map((activity, idx) => {
            if (userProfile === "requester" && idx > 0) {
              return (
                <TabsContent
                  key={activity.id}
                  value={activity.id}
                  className="col-start-2 col-end-12"
                >
                  <ActivityProcessStatus status={false} className="mb-6w-full" />
                </TabsContent>
              );
            }
            if (userProfile === "reviewer" && idx < 1) {
              return (
                <TabsContent
                  key={activity.id}
                  value={activity.id}
                  className="col-start-2 col-end-12 mt-[-24px]"
                >
                  <ActivityProcessStatus status={true} className="mb-6 w-full" />
                </TabsContent>
              );
            }
            return (
              <TabsContent key={activity.id} value={activity.id} className="col-start-2 col-end-12">
                <Card variant="solicitude" className="mb-6 py-0">
                  <CardContent>
                    {activity.isCompleted && (
                      <ActivityProcessStatus status={activity.isCompleted} />
                    )}
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="info-item"
                    >
                      <AccordionItem value="info-item">
                        <AccordionTrigger className="text-h4 font-bold" chevronClassName="size-6">
                          Información general y previa de la actividad
                        </AccordionTrigger>
                        <AccordionContent>
                          <InformationField
                            fieldData={{ name: "Revisor", description: activity.reviewerGroup }}
                          />
                          <InformationField
                            fieldData={{ name: "Responsable/s", description: activity.responsable }}
                          />
                          {activity.prevData && activity.prevData.length > 0 && (
                            <>
                              <h4 className="font-poppins">Información previa</h4>{" "}
                              <Separator
                                orientation="horizontal"
                                className="h-[1px] w-full bg-primary"
                              />
                            </>
                          )}

                          {Array.isArray(activity.prevData) &&
                            activity.prevData.map((data) => (
                              <InformationField
                                key={data.label}
                                fieldData={{
                                  name: data.label,
                                  description: Array.isArray(data.value)
                                    ? data.value.join(", ")
                                    : data.value,
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
                              <Section
                                key={section.id}
                                sectionData={{
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
                              </Section>
                            ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </MainContent>
      </Tabs>
      <SaveGroup className="col-start-2 col-end-12 place-self-end" buttons={saveButtons} />
    </>
  );
}

const requestExample = {
  id: "req-1",
  name: "Revision de matriculas",
  fields: [],
  activities: [
    {
      id: "act-1",
      order: 0,
      name: "Enviar la matricula",
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
          error: {},
          fields: [
            {
              id: "f1",
              order: 1,
              prevOrder: undefined,
              name: "Nombre estudiante",
              description: "Nombre completo del estudiante solicitante",
              type: "text",
              options: [],
              isRequired: false,
              valueType: "text",
              value: [],
              error: {},
            },
            {
              id: "f2",
              order: 2,
              prevOrder: 1,
              name: "Grupo solicitante",
              description: "Selecciona el grupo solicitante",
              type: "combobox",
              options: ["Estudiantes", "Docentes", "Ingeniería"],
              isRequired: false,
              valueType: "text",
              value: [],
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
      prevData: [{ label: "Nombre estudiante", value: ["Juan Perez"] }],
      isCompleted: false,
      error: {},
      sections: [
        {
          id: "S3",
          order: 2,
          prevOrder: 1,
          name: "Sección de emisión",
          description: "En esta sección se recopilan los datos de emisión",
          error: {},
          fields: [
            {
              id: "f1",
              order: 1,
              prevOrder: undefined,
              name: "Motivo",
              description: "Motivo de la solicitud",
              type: "textarea",
              options: [],
              isRequired: false,
              valueType: "text",
              value: [],
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
      prevData: [
        { label: "Nombre estudiante", value: ["Juan Perez"] },
        { label: "Motivo", value: ["Motivo extendido de la solicitud de matricula"] },
      ],
      isCompleted: false,
      error: {},
      sections: [
        {
          id: "S1",
          order: 1,
          prevOrder: undefined,
          name: "Sección 1",
          description: "En esta sección se validan requisitos",
          error: {},
          fields: [
            {
              id: "f1",
              order: 1,
              prevOrder: undefined,
              name: "Requisitos",
              description: "Lista de requisitos validados",
              type: "text",
              options: [],
              isRequired: false,
              valueType: "text",
              value: [],
              error: {},
            },
          ],
        },
      ],
    },
  ],
  isCompleted: false,
  error: {},
};
