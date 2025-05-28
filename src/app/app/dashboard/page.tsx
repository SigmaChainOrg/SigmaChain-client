"use client";
import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/app/components/shadcn/header";
import { useGetMe } from "@/features/auth/hooks/use-get-me";

export default function Home() {
  const router = useRouter();
  const { data: userData } = useGetMe({
    includeUserInfo: true,
    includeGroups: true,
    includeRoles: true,
  });

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
