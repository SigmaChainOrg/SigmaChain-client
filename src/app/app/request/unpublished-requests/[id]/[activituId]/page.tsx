"use client";
import { FormCard, SectionCard } from "@/app/app/request/components/form-card";
import { BreadcrumbHeader } from "@/app/components/shadcn/header";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

// Define el tipo correctamente
type ComponentType = { id: number; type: "form" | "section" };

export default function Home() {
  const { activityId } = useParams();
  const pathName = usePathname();

  // Estado único para manejar FormCards y SectionCards
  const [components, setComponents] = useState<ComponentType[]>([
    { id: 0, type: "form" }, // Inicializa con un FormCard
  ]);

  // Función para añadir un nuevo FormCard
  const addFormCard = (index: number) => {
    setComponents((prev) => {
      const newComponent: ComponentType = { id: prev.length, type: "form" };
      const updatedComponents = [...prev];
      updatedComponents.splice(index + 1, 0, newComponent); // Inserta el nuevo FormCard debajo del índice actual
      return updatedComponents;
    });
  };

  // Función para añadir un nuevo SectionCard
  const addSectionCard = (index: number) => {
    setComponents((prev) => {
      const newComponent: ComponentType = { id: prev.length, type: "section" };
      const updatedComponents = [...prev];
      updatedComponents.splice(index + 1, 0, newComponent); // Inserta el nuevo SectionCard debajo del índice actual
      return updatedComponents;
    });
  };

  // Función para eliminar un componente (FormCard o SectionCard)
  const deleteComponent = (id: number) => {
    setComponents((prev) => {
      // Si solo queda un componente de tipo "form", no se permite eliminar
      const remainingForms = prev.filter((comp) => comp.type === "form");
      if (remainingForms.length === 1 && remainingForms[0].id === id) {
        return prev;
      }
      return prev.filter((comp) => comp.id !== id);
    });
  };

  return (
    <>
      <div className="col-start-1 col-end-13">
        <BreadcrumbHeader estado={true} path={pathName} />
      </div>
      <div className="col-start-3 col-end-11 flex flex-col gap-6">
        {/* Renderiza los componentes en el orden en que se añaden */}
        {components.map((component, index) =>
          component.type === "form" ? (
            <FormCard
              key={`form-${component.id}`}
              addClick={() => addFormCard(index)} // Pasa el índice actual para agregar debajo
              addSectionClick={() => addSectionCard(index)} // Pasa el índice actual para agregar debajo
              deleteClick={() => deleteComponent(component.id)} // Pasa la función para eliminar
            />
          ) : (
            <SectionCard
              key={`section-${component.id}`}
              addClick={() => addFormCard(index)} // Pasa el índice actual para agregar debajo
              addSectionClick={() => addSectionCard(index)} // Pasa el índice actual para agregar debajo
              deleteClick={() => deleteComponent(component.id)} // Pasa la función para eliminar
            />
          ),
        )}
      </div>
    </>
  );
}
