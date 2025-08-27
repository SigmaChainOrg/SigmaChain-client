"use client";
import { RequestCardList } from "@/app/app/dashboard/components/request-card-list";
import { SearchHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useGetMe } from "@/features/auth/hooks/use-get-me";
import { useGetRequestPatterns } from "@/features/request-pattern/hooks/use-get-request-patterns";
import { useRouter } from "next/navigation";
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
      <SearchHeader
        accessButton={{
          name: "Crear nueva solicitud",
          ref: routes["request-pattern"],
        }}
      />

      <MainContent>
        <h1 className="col-start-1 col-end-10 h-auto text-h1">
          Bienvenido {userData?.userInfo?.firstName + " " + userData?.userInfo?.lastName}
        </h1>

        {(unpublishedRequests?.length ?? 0) === 0 && (
          <Button
            className="col-start-1 col-end-3"
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
      </MainContent>
    </>
  );
}
