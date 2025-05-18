import {
  Field,
  Section,
  useActivityFormStore,
} from "@/app/app/request/state/activity-form-field-store";
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

function RenderFormType(section: Section, field: Field) {
  const setFieldValue = useActivityFormStore((state) => state.setFieldValue);
  switch (field.type) {
    case "multiple-choice":
    case "choice": {
      //always show at least one input for options
      const options =
        Array.isArray(field.options) && field.options.length > 0 ? field.options : [""];

      return (
        <>
          <Label>Opciones:</Label>
          {options.map((option, index) => (
            <div key={index}>
              <div className="flex flex-row items-center gap-2">
                <Input
                  placeholder="opción"
                  className="w-fit"
                  value={option}
                  onChange={(e) => {
                    const newOptions = Array.isArray(field.options) ? [...field.options] : [""];
                    newOptions[index] = e.target.value;
                    setFieldValue(section.order, field.order, "options", newOptions);
                  }}
                />
                <Button
                  variant="ghost"
                  className="text-danger"
                  onClick={() => {
                    if (options.length > 1) {
                      const newOptions = Array.isArray(field.options) ? [...field.options] : [""];
                      newOptions.splice(index, 1);
                      setFieldValue(section.order, field.order, "options", newOptions);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newOptions = Array.isArray(field.options) ? [...field.options] : [];
                    newOptions.push("");
                    setFieldValue(section.order, field.order, "options", newOptions);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
              {field.error.options && <p className="text-sm text-danger">{field.error.options}</p>}
            </div>
          ))}
        </>
      );
    }
    case "file":
      const fileOptions = ["Documentos", "Media", "Audio"];
      return (
        <>
          <Label>Tipos de archivos aceptados:</Label>
          {fileOptions.map((option) => (
            <LabeledCheckbox
              key={option}
              label={option}
              side="right"
              checked={field.options?.includes(option)}
              onChange={(checked) => {
                let newOptions = Array.isArray(field.options) ? [...field.options] : [];
                if (checked) {
                  if (!newOptions.includes(option)) {
                    newOptions.push(option);
                  }
                } else {
                  newOptions = newOptions.filter((opt) => opt !== option);
                }
                setFieldValue(section.order, field.order, "options", newOptions);
              }}
            />
          ))}
          {field.error.options && <p className="text-sm text-danger">{field.error.options}</p>}
          <div className="flex flex-row items-end gap-2">
            <Label>Tamaño máximo:</Label>
            <Input
              placeholder="20"
              className="w-[50px]"
              type="number"
              onChange={(e) =>
                setFieldValue(section.order, field.order, "uploadFileSize", Number(e.target.value))
              }
            />
            <Label className="text-gray">MB</Label>
            {field.error.uploadFileSize && (
              <p className="text-sm text-danger">{field.error.uploadFileSize}</p>
            )}
          </div>
        </>
      );
    default:
      return null; // Render nothing for short-answer type
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

export function FormCard({ section, field }: { section: Section; field: Field }) {
  const setFieldValue = useActivityFormStore((state) => state.setFieldValue);
  const addField = useActivityFormStore((state) => state.addField);
  const deleteField = useActivityFormStore((state) => state.deleteField);
  const addSection = useActivityFormStore((state) => state.addSection);
  const clearField = useActivityFormStore((state) => state.clearField);
  const typeOptions = [
    { value: "short-answer", label: "Respuesta corta" },
    { value: "multiple-choice", label: "Opciones" },
    { value: "choice", label: "Radio button" },
    { value: "file", label: "Subida de archivos" },
  ];

  return (
    <CardBase
      type="field"
      addClick={() => addField(section.order, field.order)}
      addSectionClick={() => addSection(section.order)}
    >
      <div className="flex flex-row items-end gap-4">
        <div className="w-full">
          <Input
            placeholder="Nombre del campo"
            value={field.name}
            onChange={(e) => setFieldValue(section.order, field.order, "name", e.target.value)}
          />
          {field.error.name && <p className="text-sm text-danger">{field.error.name}</p>}
        </div>
        <Label>Tipo:</Label>
        <Combobox
          options={typeOptions}
          selectDefault={typeOptions.find((opt) => opt.value === field.type)}
          onChange={(option: { value: string; label: string }) => {
            setFieldValue(section.order, field.order, "type", option.value);
            clearField(section.order, field.order);
          }}
        />
      </div>
      <Input
        placeholder="Descripción"
        className="w-full"
        value={field.description}
        onChange={(e) => setFieldValue(section.order, field.order, "description", e.target.value)}
      />
      {field.error.description && <p className="text-sm text-danger">{field.error.description}</p>}
      {/* Render the components following the selected file type */}
      {RenderFormType(section, field)}

      <div className="mt-4 flex flex-row justify-end gap-2">
        <LabeledSwitch
          label="Campo obligatorio"
          side="left"
          checked={field.isRequired}
          onChange={(e) => setFieldValue(section.order, field.order, "isRequired", e.toString())}
        />
        <FontAwesomeIcon icon={faWindowMinimize} className="ml-4 rotate-90 text-[24px] text-gray" />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteField(section.order, field.order)}
          className="text-[24px] text-danger"
        />
      </div>
    </CardBase>
  );
}

export function SectionCard({ section }: { section: Section }) {
  const setSectionFieldValue = useActivityFormStore((state) => state.setSectionFieldValue);
  const addField = useActivityFormStore((state) => state.addField);
  const addSection = useActivityFormStore((state) => state.addSection);
  const deleteSection = useActivityFormStore((state) => state.deleteSection);

  return (
    <div>
      <div className="w-fit bg-primary py-4 pr-8 pl-4 text-primary-foreground">
        Sección {section.order + 1}
      </div>
      <CardBase
        type="section"
        addClick={() => addField(section.order, section.fields.length)}
        addSectionClick={() => addSection(section.order)}
      >
        <Input
          placeholder="Nombre de la sección"
          className="w-full"
          value={section.name}
          onChange={(e) => setSectionFieldValue(section.order, "name", e.target.value)}
        />
        {section.error.name && <p className="text-sm text-danger">{section.error.name}</p>}
        <Input
          placeholder="Descripción"
          className="w-full"
          value={section.description}
          onChange={(e) => setSectionFieldValue(section.order, "description", e.target.value)}
        />
        {section.error.description && (
          <p className="text-sm text-danger">{section.error.description}</p>
        )}
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteSection(section.order)}
          className="mt-4 self-end text-[24px] text-danger"
        />
      </CardBase>
    </div>
  );
}
