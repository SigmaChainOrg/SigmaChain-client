"use client";
import { RequestCardList } from "@/app/app/dashboard/components/request-card-list";
import { Button } from "@/app/components/shadcn/button";
import { DashboardHeader } from "@/app/components/shadcn/header";
import { routes } from "@/app/routes";
import { useGetMe } from "@/features/auth/hooks/use-get-me";
import { useRouter } from "next/navigation";
import { useGetRequestPatterns } from "@/features/request-pattern/hooks/use-get-request-patterns";
import { useMemo } from "react";

export default function Home() {
  const router = useRouter();
  
  const { data: userData } = useGetMe({
    includeUserInfo: true,
    includeGroups: true,
    includeRoles: true,
  });

  const { data: requestPatterns } = useGetRequestPatterns({});
  const publishedRequests = useMemo(
    () => requestPatterns?.filter((pattern) => pattern.publishedAt),
    [requestPatterns],
  );
  const unpublishedRequests = useMemo(
    () => requestPatterns?.filter((pattern) => !pattern.publishedAt),
    [requestPatterns],
  );

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
      {unpublishedRequests?.length ? (
        <Button
          className="col-start-7 col-end-9"
          onClick={() => {
            router.push(routes["request-pattern"]);
          }}
        >
          Crear nueva solicitud
        </Button>
      )}
      <RequestCardList
        variant="unpublished"
        requests={unpublishedRequests || []}
        className="col-start-1 col-end-10"
        cardTitle="Solicitudes no publicadas"
      />
      <RequestCardList
        variant="published"
        requests={publishedRequests || []}
        className="col-start-1 col-end-10"
        cardTitle="Solicitudes publicadas"
      />
    </>
  );
}
