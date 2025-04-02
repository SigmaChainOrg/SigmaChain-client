import { LabeledCheckbox } from "@/app/components/labeled-checkbox";
import { LabeledSwitch } from "@/app/components/labeled-switch";
import { Button } from "@/app/components/shadcn/button";
import { Card, CardContent } from "@/app/components/shadcn/card";
import { Combobox } from "@/app/components/shadcn/combobox";
import { Input } from "@/app/components/shadcn/input";
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
                  const newOptions = options.filter((_, i) => i !== index);
                  setOptions(newOptions);
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

export function FormCard({ type }: { type: string }) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]); // Estado para manejar las opciones

  return (
    <div className="flex w-full flex-row content-start items-center gap-2">
      <Card className="w-full">
        <CardContent className="flex flex-row content-start items-center gap-6 pl-0!">
          <FontAwesomeIcon icon={faEllipsis} className="rotate-90 cursor-grab bg-background" />
          <div className="flex w-full flex-col gap-4">
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
              <FontAwesomeIcon
                icon={faWindowMinimize}
                className="ml-4 rotate-90 text-[24px] text-gray"
              />
              <FontAwesomeIcon icon={faTrash} className="text-[24px] text-danger" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2">
        <Button variant="secondary">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
        <Button variant="secondary">
          <FontAwesomeIcon icon={faGripLines}></FontAwesomeIcon>
        </Button>
      </div>
    </div>
  );
}
