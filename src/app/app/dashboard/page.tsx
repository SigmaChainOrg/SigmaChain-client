"use client";
import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useRouter } from "next/navigation";

import {
  RequestCardList,
  RequestInfoCardList,
} from "@/app/app/dashboard/components/request-card-list";
import { useUserProfileStore } from "@/app/app/state/use-user-profile-store";
import { DashboardHeader } from "@/app/components/shadcn/header";
import { useGetMe } from "@/features/auth/hooks/use-get-me";

export default function Home() {
  const router = useRouter();
  const { data: userData } = useGetMe({
    includeUserInfo: true,
    includeGroups: true,
    includeRoles: true,
  });

  const userProfile = useUserProfileStore((state) => state.userProfile);
  const requests = [
    {
      id: "req-1",
      name: "Matrícula estudiantes",
      description: "Proceso de matrícula para estudiantes nuevos y antiguos.",
      isPublished: false,
      startDate: new Date("2023-10-01"),
    },
    {
      id: "req-4",
      name: "Adición de materias",
      description: "Proceso para añadir materias al plan de estudios.",
      isPublished: false,
      startDate: new Date("2023-10-01"),
    },
    {
      id: "req-2",
      name: "Solicitud carta aval institucional",
      description: "Solicitud para obtener una carta aval institucional.",
      isPublished: false,
      startDate: new Date("2023-10-01"),
    },
  ];

  return (
    <>
      <div className="col-start-1 col-end-13">
        <DashboardHeader
          accessButton={{
            name: "Crear nueva solicitud",
            ref: routes["request-pattern"],
          }}
        />
      </div>
      <h1 className="col-start-1 col-end-13 h-auto text-h1">
        Bienvenido {userData?.userInfo?.firstName + " " + userData?.userInfo?.lastName}
      </h1>

      {userProfile === "manager" && (
        <>
          <RequestCardList
            variant="unpublished"
            requests={requests}
            className="col-start-1 col-end-10"
            cardTitle="Solicitudes no publicadas"
          />
          <RequestCardList
            variant="published"
            requests={requests}
            className="col-start-1 col-end-10"
            cardTitle="Solicitudes publicadas"
          />
        </>
      )}
      {userProfile === "requester" && (
        <>
          <Button
            className="col-start-1 col-end-3"
            onClick={() => {
              router.push(routes["request-pattern"]);
            }}
          >
            Iniciar solicitud
          </Button>
          <RequestInfoCardList
            requests={requests}
            className="col-start-9 col-end-13"
            cardTitle="Solicitudes ofertadas"
          />
        </>
      )}
      {userProfile === "reviewer" && (
        <>
          <RequestCardList
            variant="default"
            requests={requests}
            className="col-start-1 col-end-10"
            cardTitle="Procesos pendientes"
          />
        </>
      )}
    </>
  );
}
