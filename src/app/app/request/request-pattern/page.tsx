"use client";
import { ActivityItem } from "@/app/app/request/components/activity-item-manager";
import { Field } from "@/app/app/request/components/field";
import { SaveGroup } from "@/app/app/request/components/save-group";
import {
  ActivityFieldSchema,
  MultipleChoiceFieldSchema,
  RequestPatternSchema,
  TextFieldSchema,
} from "@/app/app/request/schemas/request-pattern-schema";
import { Activity, useRequestPatternStore } from "@/app/app/request/state/activityItem";
import { BreadcrumbHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
import { Badge } from "@/app/components/shadcn/badge";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import { Textarea } from "@/app/components/shadcn/textarea";
import { routes } from "@/app/routes";
import { getFlattenGroups } from "@/features/group/functions/get-flatten-groups";
import { useGetGroups } from "@/features/group/hooks/use-get-groups";
import { usePostRequestPattern } from "@/features/request-pattern/hooks/use-post-request-pattern";
import { ActivityInput } from "@/features/request-pattern/types/activity";
import { ActivityAssigneeInput } from "@/features/request-pattern/types/activity-assignee";
import { AssigneeType } from "@/features/request-pattern/types/enums";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Separator } from "@radix-ui/react-separator";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Solicitudes() {
  const router = useRouter();
  const pathName = usePathname();

  const { data: groupsData } = useGetGroups({ includeUsers: true });
  const groupsList = useMemo(() => getFlattenGroups(groupsData ?? []), [groupsData]);

  const {
    name: requestName,
    setName: setRequestName,
    fields: requestFields,
    activities,
    addActivity,
    error,
    setNameError,
    id: solicitudeId,
    setActivityError,
    setFieldError,
    setFieldValue,
    reset,
  } = useRequestPatternStore();

  const saveButtons = {
    secondary: {
      value: "Cancelar",
      onClick: () => {
        reset();
        router.push(routes["unpublished-request"]);
      },
    },
    primary: {
      value: "Guardar",
      onClick: () => {
        handleRequestPatternSubmit();
      },
    },
  };

  const {
    mutateAsync: requestPatternMutate,
    isPending: requestPatternPending,
    error: requestPatternError,
  } = usePostRequestPattern();

  const mapActivityToInput = (activity: Activity): ActivityInput => {
    const assignee: ActivityAssigneeInput =
      activity.order === 0
        ? {
            assigneeType: AssigneeType.REQUESTER,
          }
        : {
            assigneeType: AssigneeType.USER,
            userId: "3b7d7cc0-649b-4a59-b9a2-28da925d731c",
          };

    return {
      activityOrder: activity.order + 1,
      label: activity.name,
      description: "",
      assignee,
      estimatedTime: "P1M",
    };
  };

  async function handleRequestPatternSubmit() {
    const requestPatternValidation = RequestPatternSchema.safeParse({
      name: requestName,
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

    if (activities.length === 0) {
      setActivityError(0, { name: "Debe agregar al menos una actividad" });
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

    const activityInputs: ActivityInput[] = activities.map(mapActivityToInput);

    const result = await requestPatternMutate({
      label: requestName,
      description: requestFields[0].value[0],
      supervisorId: null,
      groups: [],
      activities: activityInputs,
    });

    if (requestPatternError) {
      console.error("Error signing in:", requestPatternError);
      return;
    }

    router.push(routes["unpublished-request"] + `/${solicitudeId}`);
  }

  return (
    <>
      <BreadcrumbHeader estado={true} path={pathName} />

      <MainContent>
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
                        selectDefault={{ value: "add group", label: "Agregar grupo" }}
                        options={groupsList.map((group) => ({
                          value: group.groupId,
                          label: group.route,
                        }))}
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
              <Button variant="disabled"> Visualizar flujo </Button>
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
      </MainContent>
    </>
  );
}
