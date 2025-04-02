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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@radix-ui/react-dropdown-menu";

export function FormCard({ type }: { type: string }) {
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
                  { label: "short-answer", value: "Respuesta corta" },
                  { label: "option", value: "Opciones" },
                  { label: "radio-button", value: "Radio button" },
                ]}
              />
            </div>
            <Input placeholder="Descripción" className="w-full" />
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
