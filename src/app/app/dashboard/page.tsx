"use client";
import { RequestCardList } from "@/app/app/dashboard/components/request-card-list";
import { Button } from "@/app/components/shadcn/button";
import { DashboardHeader } from "@/app/components/shadcn/header";
import { routes } from "@/app/routes";
import { useGetMe } from "@/features/auth/hooks/use-get-me";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: userData } = useGetMe({
    includeUserInfo: true,
    includeGroups: true,
    includeRoles: true,
  });
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
      {requests.length < 0 ? (
        <Button
          className="col-start-7 col-end-9"
          onClick={() => {
            router.push(routes["request-pattern"]);
          }}
        >
          Crear nueva solicitud
        </Button>
      ) : null}
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
  );
}
