"use client";
import { ActivityItem } from "@/app/request/components/activityItemManager";
import { Field } from "@/app/request/components/field";
import { SaveGroup } from "@/app/request/components/save-group";
import { useActivityStore } from "@/app/request/state/activityItem";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Combobox } from "@/components/shadcn/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { BreadcrumbHeader } from "@/components/shadcn/header";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { routes } from "@/routes";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const saveButtons = {
  secondary: { value: "Cancelar", onClick: () => {} },
  primary: { value: "Guardar" },
};

export default function Solicitudes() {
  const router = useRouter();
  const pathName = usePathname();
  const { activities, addActivity } = useActivityStore();
  const [selectedGroups, setSelectedGroups] = React.useState<
    { value: string; label: string }[]
  >([]); // Almacena objetos { value, label }

  const SolicitudeTemplateSchema = z.object({
    name: z.string().min(5, { message: "El nombre es muy corto o está vacío" }),
    description: z.string().min(5, { message: "Una descripción es requerida" }),
    requesterGroup: z
      .array(z.string(), {
        message: "Al menos un grupo solicitante es requerido",
      })
      .min(0, { message: "Seleccione al menos un grupo solicitante" }),
  });

  const form = useForm<z.infer<typeof SolicitudeTemplateSchema>>({
    resolver: zodResolver(SolicitudeTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      requesterGroup: [], // Inicializa como un array vacío
    },
  });

  function onSubmit(data: z.infer<typeof SolicitudeTemplateSchema>) {
    const solicitudeData = { data: data, activities: activities };
    console.log("You submitted the following values: ", solicitudeData);
    const solicitudeId = "1";
    router.push(routes["unpublished-request"] + `/${solicitudeId}`);
  }

  const handleAddGroup = (group: { value: string; label: string }) => {
    if (!selectedGroups.some((g) => g.value === group.value)) {
      setSelectedGroups((prev) => [...prev, group]); // Agrega el objeto completo { value, label }
      form.setValue(
        "requesterGroup",
        [...selectedGroups.map((g) => g.value), group.value], // Actualiza solo los valores en el formulario
      );
    }
  };

  const handleRemoveGroup = (groupValue: string) => {
    setSelectedGroups((prev) => prev.filter((g) => g.value !== groupValue)); // Elimina el grupo del estado
    form.setValue(
      "requesterGroup",
      selectedGroups.filter((g) => g.value !== groupValue).map((g) => g.value), // Actualiza solo los valores en el formulario
    );
  };

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <Form {...form}>
        <form
          className="col-start-3 col-end-11 md:col-start-2 md:col-end-12"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card variant="solicitude">
            <CardHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la solicitud"
                        className="!text-h3 placeholder:!text-h3 focus:!text-h3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </CardHeader>
            <CardContent>
              {Object.entries(solicitudeData).map(([key, fieldData]) => (
                <Field key={key} fieldData={fieldData}>
                  <FormField
                    control={form.control}
                    name={
                      fieldData.tipo === "combobox"
                        ? "requesterGroup"
                        : "description"
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {fieldData.tipo === "text" ? (
                            <Input placeholder="tu texto aquí" {...field} />
                          ) : fieldData.tipo === "combobox" ? (
                            <div>
                              <Combobox
                                selectDefault="Agregar grupo"
                                options={[
                                  { value: "ingenieria", label: "Ingeniería" },
                                  { value: "derecho", label: "Derecho" },
                                  { value: "filosofia", label: "Filosofía" },
                                ]}
                                onChange={(option) => {
                                  handleAddGroup(option); // Agrega el grupo seleccionado
                                }}
                              />
                              {/* Renderiza los badges debajo del Combobox */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                {selectedGroups.map((group) => (
                                  <Badge
                                    key={group.value}
                                    className="flex items-center gap-2"
                                  >
                                    {group.label} {/* Muestra el label */}
                                    <Button
                                      variant="ghost"
                                      onClick={() => {
                                        handleRemoveGroup(group.value); // Elimina el grupo
                                      }}
                                      className="h-5 w-5 rounded-[100%] hover:bg-gray hover:text-red-500"
                                    >
                                      <FontAwesomeIcon icon={faX} />
                                    </Button>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ) : (
                            fieldData.tipo === "textarea" && (
                              <Textarea
                                placeholder="tu texto aquí"
                                {...field}
                              />
                            )
                          )}
                        </FormControl>
                        <FormMessage>
                          {fieldData.tipo === "combobox" &&
                            form.formState.errors.requesterGroup?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
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
                type="button"
              >
                Añadir actividad
              </Button>
            </CardContent>
          </Card>
          <SaveGroup
            className="col-start-3 col-end-12 place-self-end"
            buttons={saveButtons}
          />
        </form>
      </Form>
    </>
  );
}
