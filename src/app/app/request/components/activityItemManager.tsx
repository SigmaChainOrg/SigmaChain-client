"use client";
import { Activity, useRequestPatternStore } from "@/app/app/request/state/activityItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/shadcn/accordion";
import { Button } from "@/app/components/shadcn/button";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/shadcn/sheet";
import { routes } from "@/app/routes";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export function ActivityItem({ activity }: { activity: Activity }) {
  const setActivityField = useRequestPatternStore((state) => state.setActivityField);
  const deleteActivity = useRequestPatternStore((state) => state.deleteActivity);

  return (
    <div
      key={activity.id}
      className="grid w-full grid-cols-[15px_minmax(200px,_1fr)_minmax(200px,_1fr)_minmax(200px,_1fr)_32px] items-center gap-5 border-[1px] border-solid border-background py-4 pr-4"
    >
      <div className="h-full cursor-grab place-content-center bg-background px-1">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      <div>
        <Input
          placeholder="Nombre de la actividad"
          value={activity.name}
          onChange={(e) => setActivityField(activity.id, "name", e.target.value)}
          className="w-auto"
        />
        {activity.error.name && <p className="text-sm text-danger">{activity.error.name}</p>}
      </div>
      <div>
        <Combobox
          options={[
            { value: "engineering", label: "Ingeniería" },
            { value: "marketing", label: "Marketing" },
          ]}
          onChange={(option) => setActivityField(activity.id, "reviewerGroup", option.value)}
        />
        {activity.error.reviewerGroup && (
          <p className="text-sm text-danger">{activity.error.reviewerGroup}</p>
        )}
      </div>
      <div>
        <Combobox
          options={[
            { value: "anita", label: "Anita" },
            { value: "juan", label: "Juan" },
          ]}
          onChange={(option) => setActivityField(activity.id, "responsable", option.value)}
        />
        {activity.error.responsable && (
          <p className="text-sm text-danger">{activity.error.responsable}</p>
        )}
      </div>
      <Button
        variant="ghost"
        className="hover:bg-danger [&>svg]:text-danger hover:[&>svg]:text-white"
        onClick={() => deleteActivity(activity.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}

export function ActivityItemView({
  activity,
  requestId,
}: {
  activity: Activity;
  requestId: string;
}) {
  const activities = useRequestPatternStore((state) => state.activities);

  const router = useRouter();
  return (
    <div
      key={activity.id}
      className="grid grid-cols-5 flex-row items-center gap-2 border-[1px] border-solid border-gray p-4"
    >
      <p className="w-auto">
        <b>{activity.name}</b>
      </p>
      <p className="w-auto">{activity.reviewerGroup}</p>
      <p className="w-auto">{activity.responsable}</p>
      {/* Botón para añadir formulario la actividad */}
      <Button
        variant="secondary"
        onClick={() => {
          const activityId = requestId + "-form";
          router.push(routes["unpublished-request"] + `/${requestId}` + `/${activityId}`);
        }}
      >
        Añadir formulario
      </Button>
      {/* Botón para gestionar la información a mostrar de la actividad */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Gestionar información</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Gestionar información de la actividad</SheetTitle>
            <SheetDescription>Realiza cambios en la información de la actividad.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 px-4 py-4">
            <h5>{activity.name}</h5>
            <Accordion type="single" collapsible className="w-full">
              {activities.map((activity) => (
                <AccordionItem value={"item-" + activity.id} key={activity.id}>
                  <AccordionTrigger>{activity.name}</AccordionTrigger>
                  <AccordionContent>Información de la actividad: {activity.name}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Guardar cambios</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
