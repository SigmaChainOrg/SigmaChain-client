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

export function SectionCard({ type }: { type: string }) {
  return (
    <div>
      <div className="w-fit bg-primary py-4 pr-8 pl-4 text-primary-foreground">Nueva sección</div>
      <div className="flex w-full flex-row content-start items-center gap-2">
        <Card className="w-full rounded-tl-none">
          <CardContent className="flex flex-row content-start items-center gap-6 pl-0!">
            <FontAwesomeIcon icon={faEllipsis} className="rotate-90 cursor-grab bg-background" />
            <div className="flex w-full flex-col gap-4">
              <Input placeholder="Nombre de la sección" className="w-full" />

              <Input placeholder="Descripción" className="w-full" />

              <FontAwesomeIcon icon={faTrash} className="mt-4 self-end text-[24px] text-danger" />
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
    </div>
  );
}
