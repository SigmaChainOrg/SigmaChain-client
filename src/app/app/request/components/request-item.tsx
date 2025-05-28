import { Button } from "@/app/components/shadcn/button";
import { routes } from "@/app/routes";
import { useRouter } from "next/navigation";

export interface RequestInfo {
  id: string;
  name: string;
  description: string;
  isPublished: boolean;
  startDate: Date | undefined;
  activities?: string[];
}

export function RequestItemView({
  request,
  variant,
}: {
  request: RequestInfo;
  variant: "published" | "unpublished" | "default";
}) {
  const router = useRouter();
  if (variant === "default") {
    return (
      <Button
        key={request.id}
        variant="ghost"
        className="h-fit hover:cursor-pointer"
        onClick={() => router.push(routes["request-process"])}
      >
        <div
          key={request.id}
          className="grid w-full grid-cols-[1fr_2fr_1fr_1fr] items-center justify-between gap-5 border-[1px] border-solid border-gray p-4 font-medium"
        >
          <p className="truncate overflow-hidden font-bold whitespace-nowrap">{request.name}</p>
          <p className="truncate overflow-hidden whitespace-nowrap">{request.description}</p>
          <p className="truncate overflow-hidden whitespace-nowrap">Remitente</p>
          <p className="place-self-end truncate overflow-hidden font-bold whitespace-nowrap">
            {request.startDate ? request.startDate.toISOString().slice(0, 10) : ""}
          </p>
        </div>
      </Button>
    );
  }

  if (variant === "published") {
    return (
      <Button
        key={request.id}
        variant="ghost"
        className="h-fit hover:cursor-pointer"
        onClick={() => router.push(routes["published-request"])}
      >
        <div
          key={request.id}
          className="grid w-full grid-cols-[1fr_3fr_2fr] items-center justify-between gap-5 border-[1px] border-solid border-gray p-4 font-medium"
        >
          <p className="truncate overflow-hidden font-bold whitespace-nowrap">{request.name}</p>
          <p className="truncate overflow-hidden whitespace-nowrap">{request.description}</p>
          <p className="truncate overflow-hidden whitespace-nowrap text-green-600">
            Se aceptan solicitudes
          </p>
        </div>
      </Button>
    );
  }

  // unpublished
  return (
    <Button
      key={request.id}
      variant="ghost"
      className="h-fit hover:cursor-pointer"
      onClick={() => router.push(routes["unpublished-request"] + `/${request.id}`)}
    >
      <div
        key={request.id}
        className="grid w-full grid-cols-[1fr_3fr_1fr] items-center justify-between gap-5 border-[1px] border-solid border-gray p-4 font-medium"
      >
        <p className="truncate overflow-hidden font-bold whitespace-nowrap">{request.name}</p>
        <p className="truncate overflow-hidden whitespace-nowrap">{request.description}</p>
        <p className="place-self-end truncate overflow-hidden font-bold whitespace-nowrap">
          {request.startDate ? request.startDate.toISOString().slice(0, 10) : ""}
        </p>
      </div>
    </Button>
  );
}
