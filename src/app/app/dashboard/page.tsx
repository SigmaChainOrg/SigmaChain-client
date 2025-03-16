"use client";
import { Button } from "@/components/shadcn/button";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/shadcn/header";
//import { z } from "zod";

//const userDataSchema = z.object({  name: z.string(),});

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="col-start-1 col-end-13">
        <DashboardHeader
          accessButon={{
            name: "Crear nueva solicitud",
            ref: routes["crear-solicitud"],
          }}
        />
      </div>
      <h1 className="col-start-1 col-end-13 h-auto text-h1">Bienvenido Juan</h1>
      <Button
        className="col-start-1 col-end-3"
        onClick={() => {
          router.push(routes["crear-solicitud"]);
        }}
      >
        Crear nueva solicitud
      </Button>
    </>
  );
}
