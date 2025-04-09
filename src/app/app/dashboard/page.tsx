"use client";
import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/app/components/shadcn/header";
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
            ref: routes["request-pattern"],
          }}
        />
      </div>
      <h1 className="col-start-1 col-end-13 h-auto text-h1">Bienvenido Juan</h1>
      <Button
        className="col-start-1 col-end-3"
        onClick={() => {
          router.push(routes["request-pattern"]);
        }}
      >
        Crear nueva solicitud
      </Button>
    </>
  );
}
