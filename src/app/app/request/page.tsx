"use client";
import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useRouter } from "next/navigation";

import { SearchHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";

export default function Solicitude() {
  const router = useRouter();
  return (
    <>
      <SearchHeader
        accessButton={{
          name: "Crear nueva solicitud",
          ref: routes["request-pattern"],
        }}
      />

      <MainContent>
        <h3 className="col-start-1 col-end-13 h-auto">Todas las solicitudes</h3>
        <Button
          className="col-start-1 col-end-3"
          onClick={() => {
            router.push(routes["request-pattern"]);
          }}
        >
          Crear nueva solicitud
        </Button>
      </MainContent>
    </>
  );
}
