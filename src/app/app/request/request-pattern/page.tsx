"use client";
import { ActivityItem } from "@/app/app/request/components/activityItemManager";
import { Field } from "@/app/app/request/components/field";
import { SaveGroup } from "@/app/app/request/components/save-group";
import {
  ActivityFieldSchema,
  MultipleChoiceFieldSchema,
  RequestPatternSchema,
  TextFieldSchema,
} from "@/app/app/request/schemas/request-pattern-schema";
import { useRequestPatternStore } from "@/app/app/request/state/activityItem";
import { Badge } from "@/app/components/shadcn/badge";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { Input } from "@/app/components/shadcn/input";
import { Textarea } from "@/app/components/shadcn/textarea";
import { routes } from "@/app/routes";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Separator } from "@radix-ui/react-separator";
import { usePathname, useRouter } from "next/navigation";

export default function Solicitudes() {
  const router = useRouter();
  const pathName = usePathname();

  const requestName = useRequestPatternStore((state) => state.name);
  const setRequestName = useRequestPatternStore((state) => state.setName);
  const requestFields = useRequestPatternStore((state) => state.fields);
  const activities = useRequestPatternStore((state) => state.activities);
  const addActivity = useRequestPatternStore((state) => state.addActivity);
  const error = useRequestPatternStore((state) => state.error);
  const name = useRequestPatternStore((state) => state.name);
  const setNameError = useRequestPatternStore((state) => state.setNameError);
  const solicitudeId = useRequestPatternStore((state) => state.id);
  const setActivityError = useRequestPatternStore((state) => state.setActivityError);
  const setFieldError = useRequestPatternStore((state) => state.setFieldError);
  const setFieldValue = useRequestPatternStore((state) => state.setFieldValue);

  const saveButtons = {
    secondary: { value: "Cancelar", onClick: () => {} },
    primary: {
      value: "Guardar",
      onClick: () => {
        handleRequestPatternSubmit();
      },
    },
  };

  function handleRequestPatternSubmit() {
    //Que approach es mejor? El de validar todo o por bloques? Este es por bloques, el de activityForm es todo
    const requestPatternValidation = RequestPatternSchema.safeParse({
      name,
    });

    if (!requestPatternValidation.success) {
      const fieldErrors = requestPatternValidation.error.flatten().fieldErrors;
      setNameError(fieldErrors.name ? fieldErrors.name[0] : undefined);

      return;
    }

    console.log(requestFields[0].value[0]);

    const descriptionValidation = TextFieldSchema.safeParse({
      text: requestFields[0].value[0],
    });

    if (!descriptionValidation.success) {
      const descriptionError = descriptionValidation.error.flatten().fieldErrors;
      const error = {
        value: descriptionError.text ? descriptionError.text[0] : undefined,
      };
      setFieldError(requestFields[0].order, error);
      return;
    }

    const requestGroupValidation = MultipleChoiceFieldSchema.safeParse({
      options: requestFields[1].value,
    });
    if (!requestGroupValidation.success) {
      const requestGroupError = requestGroupValidation.error.flatten().fieldErrors;
      const error = {
        value: requestGroupError.options ? requestGroupError.options[0] : undefined,
      };
      setFieldError(requestFields[1].order, error);
      return;
    }

    let hasActivityErrors = false;

    for (const activity of activities) {
      const activityValidation = ActivityFieldSchema.safeParse({
        name: activity.name,
        reviewerGroup: activity.reviewerGroup,
        responsable: activity.responsable,
      });
      if (!activityValidation.success) {
        hasActivityErrors = true;
        const activityError = activityValidation.error.flatten().fieldErrors;
        const error = {
          name: activityError.name ? activityError.name[0] : undefined,
          reviewerGroup: activityError.reviewerGroup ? activityError.reviewerGroup[0] : undefined,
          responsable: activityError.responsable ? activityError.responsable[0] : undefined,
        };
        setActivityError(activity.order, error);
      }
    }

    if (hasActivityErrors) {
      return;
    }

    router.push(routes["unpublished-request"] + `/${solicitudeId}`);
  }

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>

      <Card variant="solicitude" className="col-start-2 col-end-12">
        <CardHeader>
          <Input
            placeholder="Nombre de la solicitud"
            className="!text-h3 placeholder:!text-h3 focus:!text-h3"
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
          />
          {error.name && <p className="text-sm text-danger">{error.name}</p>}
        </CardHeader>
        <CardContent>
          {Object.entries(requestFields).map(([fieldId, field]) => (
            <Field key={fieldId} fieldData={{ name: field.name, description: field.description }}>
              <div key={fieldId}>
                {field.type === "text" ? (
                  <Input
                    placeholder="tu texto aquí"
                    value={field.value[0]}
                    onChange={(e) => setFieldValue(field.order, [e.target.value])}
                  />
                ) : field.type === "combobox" ? (
                  <div>
                    <Combobox
                      selectDefault="Agregar grupo"
                      options={[
                        { value: "engineering", label: "Ingeniería" },
                        { value: "law", label: "Derecho" },
                        { value: "philosophy", label: "Filosofía" },
                      ]}
                      onChange={(e) => {
                        const value = Array.isArray(field.value) ? field.value : [];
                        const newValue = value.includes(e.value) ? value : [...value, e.value];
                        setFieldValue(field.order, newValue);
                      }}
                    />
                    {/* Renderiza los badges debajo del Combobox */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {field.value.map((group, index) => (
                        <Badge key={index} className="flex items-center gap-2 text-black">
                          {group}
                          <Button
                            variant="ghost"
                            onClick={() => {
                              const newValue = field.value.filter((g: string) => g !== group);
                              setFieldValue(field.order, newValue);
                            }}
                            className="h-5 w-5 rounded-[100%] hover:bg-gray"
                          >
                            <FontAwesomeIcon icon={faX} className="hover:text-red-500" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  field.type === "textarea" && (
                    <Textarea
                      placeholder="tu texto aquí"
                      onChange={(e) => setFieldValue(field.order, [e.target.value])}
                    />
                  )
                )}
                {field.error.value && <p className="text-sm text-danger">{field.error.value}</p>}
              </div>
            </Field>
          ))}
          <div className="mt-4 flex w-full flex-row items-center justify-between">
            <h4 className="font-poppins"> Actividades para completar la solicitud</h4>
            <Button variant="secondary"> Visualizar flujo </Button>
          </div>
          <Separator orientation="horizontal" className="mt-[-12px] h-[1px] w-full bg-primary" />
          <div className="flex w-full flex-col gap-1">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
          <Button
            variant="secondary"
            className="place-self-end"
            type="button"
            onClick={addActivity}
          >
            Añadir actividad
          </Button>
        </CardContent>
      </Card>
      <SaveGroup className="col-start-3 col-end-12 place-self-end" buttons={saveButtons} />
    </>
  );
}
