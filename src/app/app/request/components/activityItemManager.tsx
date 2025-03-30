"use client";
import { Activity, useActivityStore } from "@/app/app/request/state/activityItem";
import { Button } from "@/app/components/shadcn/button";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import { faEllipsisVertical, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityItem(activity: Activity) {
  const { deleteActivity, setActivityName, setActivityReviewerGroup, setActivityResponsable } =
    useActivityStore();

  return (
    <div
      key={activity.id}
      className="grid w-full grid-cols-[15px_minmax(200px,_1fr)_minmax(200px,_1fr)_minmax(200px,_1fr)_32px] items-center gap-5 border-[1px] border-solid border-background py-4 pr-4"
    >
      <div className="h-full cursor-grab place-content-center bg-background px-1">
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      {/* Input para el nombre de la actividad */}
      <Input
        placeholder="Nombre de la actividad"
        value={activity.name}
        onChange={(e) => setActivityName(activity.id, e.target.value)}
        className="w-auto"
      />
      {/* Combobox para el grupo revisor */}
      <Combobox
        options={[
          { value: "ingenieria", label: "Ingeniería" },
          { value: "marketing", label: "Marketing" },
        ]}
        onChange={(option) => setActivityReviewerGroup(activity.id, option.value)} // Actualiza el grupo revisor
      />
      {/* Combobox para el responsable */}
      <Combobox
        options={[
          { value: "anita", label: "Anita" },
          { value: "juan", label: "Juan" },
        ]}
        onChange={(option) => setActivityResponsable(activity.id, option.value)} // Actualiza el responsable
      />

      {/* Botón para eliminar la actividad */}
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

export function ActivityItemView(activity: Activity) {
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
      <Button variant="secondary" onClick={() => {}}>
        Añadir formulario
      </Button>
      {/* Botón para gestionar la información a mostrar de la actividad */}
      <Button variant="secondary" onClick={() => {}}>
        Gestionar información
      </Button>
    </div>
  );
}
