"use client";
import {
  Activity,
  useActivityStore,
} from "@/app/solicitudes/utils/zustand/activityItem";
import { Button } from "@/components/shadcn/button";
import { Combobox } from "@/components/shadcn/combobox";
import { Input } from "@/components/shadcn/input";
import {
  faEllipsisVertical,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityItem(activity: Activity) {
  const {
    deleteActivity,
    setActivityName,
    setActivityReviewerGroup,
    setActivityResponsable,
  } = useActivityStore();

  return (
    <div
      key={activity.id}
      className="flex w-full flex-row items-center justify-start gap-5 border-[1px] border-solid border-background py-4 pr-4"
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
        selectDefault="Seleccionar grupo"
        options={[
          { value: "ingenieria", label: "Ingeniería" },
          { value: "marketing", label: "Marketing" },
        ]}
        onChange={(value) => setActivityReviewerGroup(activity.id, value)} // Actualiza el grupo revisor
      />
      {/* Combobox para el responsable */}
      <div className="flex flex-row items-center gap-2">
        <Combobox
          selectDefault="Seleccionar responsable"
          options={[
            { value: "anita", label: "Anita" },
            { value: "juan", label: "Juan" },
          ]}
          onChange={(value) => setActivityResponsable(activity.id, value)} // Actualiza el responsable
        >
          <FontAwesomeIcon icon={faUser} className="rounded-[100px]" />
        </Combobox>
      </div>
      {/* Botón para eliminar la actividad */}
      <Button
        variant="ghost"
        className="hover:bg-danger [&>svg]:text-danger [&>svg]:hover:text-white"
        onClick={() => deleteActivity(activity.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}
