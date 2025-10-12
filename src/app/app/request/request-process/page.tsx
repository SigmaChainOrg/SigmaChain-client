"use client";
import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useRouter } from "next/navigation";
//import image from "./image.png";

import { SearchHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
//import { z } from "zod";

//const userDataSchema = z.object({  name: z.string(),});

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
        <h3 className="col-start-1 col-end-13 h-auto">Tus procesos</h3>
        <Button
          className="col-start-1 col-end-3"
          onClick={() => {
            router.push(routes["request-pattern"]);
          }}
        >
          Comienza aquí
        </Button>
      </MainContent>
    </>
  );
}
