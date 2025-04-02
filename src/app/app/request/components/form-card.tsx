import { LabeledCheckbox } from "@/app/components/labeled-checkbox";
import { LabeledSwitch } from "@/app/components/labeled-switch";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
import { cn } from "@/features/shadcn/services/utils";
import {
  faEllipsis,
  faGripLines,
  faPlus,
  faTrash,
  faWindowMinimize,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

function RenderFormType(
  type: string,
  options: string[],
  setOptions: React.Dispatch<React.SetStateAction<string[]>>,
) {
  switch (type) {
    case "multiple-choice":
    case "choice":
      return (
        <>
          <Label>Opciones:</Label>
          {options.map((option, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <Input
                placeholder="opción"
                className="w-fit"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />
              <Button
                variant="ghost"
                className="text-danger"
                onClick={() => {
                  if (options.length > 1) {
                    // Solo permite eliminar si hay más de una opción
                    const newOptions = options.filter((_, i) => i !== index);
                    setOptions(newOptions);
                  }
                }}
              >
                <FontAwesomeIcon icon={faX} />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setOptions([...options, ""])} // Agrega una nueva opción vacía
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          ))}
        </>
      );
    case "file":
      return (
        <>
          <Label>Tipos de archivos aceptados:</Label>
          <LabeledCheckbox label="Documentos" side="right" />
          <LabeledCheckbox label="Media" side="right" />
          <LabeledCheckbox label="Audio" side="right" />
          <div className="flex flex-row items-end gap-2">
            <Label>Tamaño máximo:</Label>
            <Input placeholder="20" className="w-[50px]" type="number" />
            <Label className="text-gray">MB</Label>
          </div>
        </>
      );
    default:
      return null; // No renderiza nada para "short-answer"
  }
}

function CardBase({
  type,
  addClick,
  addSectionClick,
  children,
}: {
  type: string;
  addClick?: () => void;
  addSectionClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row content-start items-center gap-2">
      <Card className={cn("w-full", type === "section" && "rounded-tl-none")}>
        <CardContent className="flex flex-row content-start items-center gap-6 pl-0!">
          <FontAwesomeIcon icon={faEllipsis} className="rotate-90 cursor-move bg-background" />
          <div className="flex w-full flex-col gap-4">{children}</div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2">
        <Button variant="secondary" onClick={addClick}>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
        <Button variant="secondary" onClick={addSectionClick}>
          <FontAwesomeIcon icon={faGripLines}></FontAwesomeIcon>
        </Button>
      </div>
    </div>
  );
}

export function FormCard({
  addClick,
  addSectionClick,
  deleteClick,
}: {
  addClick?: () => void;
  addSectionClick?: () => void;
  deleteClick?: () => void;
}) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]); // Estado para manejar las opciones

  return (
    <CardBase type="field" addClick={addClick} addSectionClick={addSectionClick}>
      <div className="flex flex-row items-end gap-4">
        <Input placeholder="Nombre del campo" className="w-full" />
        <Label>Tipo:</Label>
        <Combobox
          options={[
            { value: "short-answer", label: "Respuesta corta" },
            { value: "multiple-choice", label: "Opciones" },
            { value: "choice", label: "Radio button" },
            { value: "file", label: "Subida de archivos" },
          ]}
          onChange={(option) => {
            setSelectedType(option.value);
            if (option.value === "multiple-choice" || option.value === "choice") {
              setOptions([""]); // Inicializa con una opción vacía
            } else {
              setOptions([]); // Limpia las opciones para otros tipos
            }
          }}
        />
      </div>
      <Input placeholder="Descripción" className="w-full" />
      {/* Renderiza contenido dinámico basado en el tipo seleccionado */}
      {RenderFormType(selectedType, options, setOptions)}

      <div className="mt-4 flex flex-row justify-end gap-2">
        <LabeledSwitch label="Campo obligatorio" side="left" />
        <FontAwesomeIcon icon={faWindowMinimize} className="ml-4 rotate-90 text-[24px] text-gray" />
        <FontAwesomeIcon icon={faTrash} onClick={deleteClick} className="text-[24px] text-danger" />
      </div>
    </CardBase>
  );
}

export function SectionCard({
  addClick,
  addSectionClick,
  deleteClick,
}: {
  addClick?: () => void;
  addSectionClick?: () => void;
  deleteClick?: () => void;
}) {
  return (
    <div>
      <div className="w-fit bg-primary py-4 pr-8 pl-4 text-primary-foreground">Nueva sección</div>
      <CardBase type="section" addClick={addClick} addSectionClick={addSectionClick}>
        <Input placeholder="Nombre de la sección" className="w-full" />
        <Input placeholder="Descripción" className="w-full" />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={deleteClick}
          className="mt-4 self-end text-[24px] text-danger"
        />
      </CardBase>
    </div>
  );
}
