"use client";
import { FormCard, SectionCard } from "@/app/app/request/components/form-card";
import { SaveGroup } from "@/app/app/request/components/save-group";
import {
  activityFormChoiceFieldSchema,
  activityFormSectionSchema,
  activityFormTextFieldSchema,
  activityFormUploadFilesSchema,
} from "@/app/app/request/schemas/activity-form-field-schema";
import { useActivityFormStore } from "@/app/app/request/state/activity-form-field-store";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { routes } from "@/app/routes";
import { usePathname, useRouter } from "next/navigation";

export default function ActivityFormPattern() {
  const router = useRouter();
  const pathName = usePathname();

  const sections = useActivityFormStore((state) => state.sections);
  const setSectionError = useActivityFormStore((state) => state.setSectionError);
  const setFieldError = useActivityFormStore((state) => state.setFieldError);

  function handleSaveForm() {
    let hasSectionErrors = false;
    let hasFieldErrors = false;

    for (const section of sections) {
      const sectionValidation = activityFormSectionSchema.safeParse({
        name: section.name,
        description: section.description,
      });

      if (!sectionValidation.success) {
        hasSectionErrors = true;
        const validationResponse = sectionValidation.error.flatten().fieldErrors;
        const errors = {
          name: validationResponse.name ? validationResponse.name[0] : undefined,
          description: validationResponse.description
            ? validationResponse.description[0]
            : undefined,
        };
        setSectionError(section.order, errors);
      }

      for (const field of section.fields) {
        switch (field.type) {
          case "short-answer":
            const shortAnswerValidation = activityFormTextFieldSchema.safeParse({
              name: field.name,
              description: field.description,
            });

            if (!shortAnswerValidation.success) {
              hasFieldErrors = true;
              const validationResponse = shortAnswerValidation.error.flatten().fieldErrors;
              const errors = {
                name: validationResponse.name ? validationResponse.name[0] : undefined,
                description: validationResponse.description
                  ? validationResponse.description[0]
                  : undefined,
              };
              setFieldError(section.order, field.order, errors);
              break;
            }
            break;
          case "multiple-choice":
          case "choice":
            const choiceValidation = activityFormChoiceFieldSchema.safeParse({
              name: field.name,
              description: field.description,
              options: field.options,
            });

            if (!choiceValidation.success) {
              hasFieldErrors = true;
              const validationResponse = choiceValidation.error.flatten().fieldErrors;
              const errors = {
                name: validationResponse.name ? validationResponse.name[0] : undefined,
                description: validationResponse.description
                  ? validationResponse.description[0]
                  : undefined,
                options: validationResponse.options ? validationResponse.options[0] : undefined,
              };
              setFieldError(section.order, field.order, errors);
              break;
            }
            break;
          case "file":
            const fieldFileValidation = activityFormUploadFilesSchema.safeParse({
              name: field.name,
              description: field.description,
              options: field.options,
              uploadFileSize: field.uploadFileSize,
            });

            if (!fieldFileValidation.success) {
              hasFieldErrors = true;
              const validationResponse = fieldFileValidation.error.flatten().fieldErrors;
              const errors = {
                name: validationResponse.name ? validationResponse.name[0] : undefined,
                description: validationResponse.description
                  ? validationResponse.description[0]
                  : undefined,
                options: validationResponse.options ? validationResponse.options[0] : undefined,
                uploadFileSize: validationResponse.uploadFileSize
                  ? validationResponse.uploadFileSize[0]
                  : undefined,
              };
              setFieldError(section.order, field.order, errors);
              break;
            }
            break;
        }
      }
    }

    if (hasSectionErrors || hasFieldErrors) {
      return;
    }

    router.push(routes["unpublished-request"] + `/${pathName.toString().split("/")[4]}`);
  }

  const saveButtons = {
    secondary: { value: "Cancelar", onClick: () => {} },
    primary: {
      value: "Guardar",
      onClick: () => {
        handleSaveForm();
      },
    },
  };

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <div className="col-start-3 col-end-11 flex flex-col gap-6">
        {sections.map((section, index) => (
          <div key={index}>
            <SectionCard section={section} />

            {section.fields.map((field, index) => (
              <FormCard key={index} section={section} field={field} />
            ))}
          </div>
        ))}
      </div>
      <SaveGroup
        className="col-start-3 col-end-11 place-self-end"
        buttons={saveButtons}
      ></SaveGroup>
    </>
  );
}
