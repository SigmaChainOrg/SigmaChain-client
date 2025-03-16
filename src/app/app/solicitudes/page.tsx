"use client";
import { Button } from "@/components/shadcn/button";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
//import image from "./image.png";

import { DashboardHeader } from "@/components/shadcn/header";
//import { z } from "zod";

//const userDataSchema = z.object({  name: z.string(),});

export default function Solicitude() {
  const router = useRouter();
  return (
    <>
      <div className="col-start-1 col-end-13">
        <DashboardHeader
          accessButon={{
            name: "Crear nueva solicitud",
            ref: routes["crear-modelo-solicitud"],
          }}
        />
      </div>
      <h3 className="col-start-1 col-end-13 h-auto">Todas las solicitudes</h3>
      <Button
        className="col-start-1 col-end-3"
        onClick={() => {
          router.push(routes["crear-modelo-solicitud"]);
        }}
      >
        Crear nueva solicitud
      </Button>
    </>
  );
}
