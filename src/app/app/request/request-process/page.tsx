"use client";
import { ActivityProcessStatus } from "@/app/app/request/components/activity-process-status";
import { Field, InformationField } from "@/app/app/request/components/field";
import { SaveGroup } from "@/app/app/request/components/save-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/shadcn/accordion";
import { Card, CardContent } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { Input } from "@/app/components/shadcn/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/shadcn/tabs";
import { Textarea } from "@/app/components/shadcn/textarea";
import { usePathname } from "next/navigation";

export default function RequestProcess() {
  const pathName = usePathname();

  const saveButtons = {
    secondary: { value: "Cancelar", onClick: () => {} },
    primary: { value: "Guardar", onClick: () => {} },
  };

  const activityInformation = {
    fieldOne: { name: "Nombre estudiante", value: "Nombre Completo Estudiante Solicitante" },
    fieldTwo: { name: "Grupo solicitante", value: ["Estudiantes", "Docentes", "Ingeniería"] },
  };

  const activities = [
    {
      id: "a1",
      order: 1,
      name: "Activity 1",
      isComplete: false,
      fields: [
        {
          id: "f1",
          order: 1,
          name: "Campo 1",
          description: "Descripción del campo 1",
          type: "text",
          optional: false,
          error: {},
        },
        {
          id: "f2",
          order: 2,
          name: "Campo 2",
          description: "Descripción del campo 2",
          type: "combobox",
          options: ["Ingeniería", "Derecho", "Filosofía"],
          optional: false,
          error: {},
        },
      ],
    },
    {
      id: "a2",
      order: 2,
      name: "Activity 2",
      isComplete: false,
      fields: [
        {
          id: "f1",
          order: 1,
          name: "Campo A",
          description: "Descripción del campo A",
          type: "text",
          optional: false,
          error: {},
        },
        {
          id: "f2",
          order: 2,
          name: "Campo B",
          description: "Descripción del campo B",
          type: "textarea",
          optional: false,
          error: {},
        },
      ],
    },
    {
      id: "a3",
      order: 3,
      name: "Activity 3",
      isComplete: false,
      fields: [
        {
          id: "f1",
          order: 1,
          name: "Campo X",
          description: "Descripción del campo X",
          type: "text",
          optional: false,
          error: {},
        },
      ],
    },
    {
      id: "a4",
      order: 4,
      name: "Activity 4",
      isComplete: false,
      fields: [
        {
          id: "f1",
          order: 1,
          name: "Campo Z",
          description: "Descripción del campo Z",
          type: "text",
          optional: false,
          error: {},
        },
      ],
    },
  ];

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <Tabs defaultValue={activities[0].id} className="col-start-1 col-end-13 mx-[-16px]">
        <TabsList className="w-full">
          {activities.map((activity) => (
            <TabsTrigger key={activity.id} value={activity.id}>
              {activity.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {activities.map((activity) => (
          <TabsContent key={activity.id} value={activity.id} className="grid grid-cols-12">
            <Card variant="solicitude" className="col-start-2 col-end-12 my-6 py-0">
              <CardContent>
                {/* Primer Accordion: Información general (NO CAMBIAR) */}
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
            {/* Segundo Accordion: Campos de la actividad */}
            <Card variant="solicitude" className="col-start-2 col-end-12 py-0">
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="fields-item">
                    <AccordionTrigger className="text-h4 font-bold" chevronClassName="size-6">
                      Campos de la actividad
                    </AccordionTrigger>
                    <AccordionContent>
                      {activity.fields.map((field) => (
                        <Field
                          key={field.id}
                          fieldData={{ name: field.name, description: field.description }}
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
                                selectDefault={{ value: "add group", label: "Agregar grupo" }}
                                options={
                                  field.options
                                    ? field.options.map((opt) => ({ value: opt, label: opt }))
                                    : []
                                }
                                onChange={(option) => {
                                  /* 
                                  const value = addRequesterGroup(option.value);
                                  setFieldValue(field.order, value ? value : field.value);
                                  */
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <ActivityProcessStatus status={false} className="col-start-2 col-end-12 my-6" />
          </TabsContent>
        ))}
      </Tabs>
      <SaveGroup className="col-start-2 col-end-12 place-self-end" buttons={saveButtons} />
    </>
  );
}
