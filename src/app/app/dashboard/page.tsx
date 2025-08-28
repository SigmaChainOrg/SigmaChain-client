"use client";
import { RequestCardList } from "@/app/app/dashboard/components/request-card-list";
import { SearchHeader } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
import { Button } from "@/app/components/shadcn/button";
import { Skeleton } from "@/app/components/shadcn/skeleton";
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

  const showRequestCardLists = () => {
    const { data: requestPatterns, isLoading: isLoadingPatterns } = useGetRequestPatterns({});
    const publishedRequests = useMemo(
      () => requestPatterns?.filter((pattern) => pattern.publishedAt),
      [requestPatterns],
    );
    const unpublishedRequests = useMemo(
      () => requestPatterns?.filter((pattern) => !pattern.publishedAt),
      [requestPatterns],
    );

    if (isLoadingPatterns) {
      return (
        <>
          <Skeleton className="col-start-1 col-end-10 h-52" />
          <Skeleton className="col-start-1 col-end-10 h-52" />
        </>
      );
    }

    if (requestPatterns?.length ?? 0 === 0) {
      return (
        <Button
          className="col-start-1 col-end-3"
          onClick={() => {
            router.push(routes["request-pattern"]);
          }}
        >
          Crear nueva solicitud
        </Button>
      );
    }

    return (
      <>
        {(unpublishedRequests?.length ?? 0) === 0 && (
          <RequestCardList
            variant="unpublished"
            requests={unpublishedRequests || []}
            className="col-start-1 col-end-10"
            cardTitle="Solicitudes no publicadas"
          />
        )}
        {(publishedRequests?.length ?? 0) === 0 && (
          <RequestCardList
            variant="published"
            requests={publishedRequests || []}
            className="col-start-1 col-end-10"
            cardTitle="Solicitudes publicadas"
          />
        )}
      </>
    );
  };

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

        {showRequestCardLists()}
      </MainContent>
    </>
  );
}
