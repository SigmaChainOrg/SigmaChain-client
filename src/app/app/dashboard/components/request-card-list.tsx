import {
  RequestInfo,
  RequestInfoItem,
  RequestItemView,
} from "@/app/app/request/components/request-item";
import { Card, CardContent, CardHeader } from "@/app/components/shadcn/card";
import { cn } from "@/features/shadcn/services/utils";

export function RequestCardList({
  cardTitle,
  className,
  requests,
  variant,
}: {
  cardTitle: string;
  className?: string;
  requests: RequestInfo[];
  variant: "published" | "unpublished" | "default";
}) {
  return (
    <Card className={cn("w-full py-0", className)} variant="solicitude">
      <CardHeader className="pt-5! text-h3 font-bold">{cardTitle}</CardHeader>
      <CardContent className="flex w-full flex-col gap-0 pt-0">
        <div className="grid w-full grid-cols-4 items-center justify-between gap-2 pl-4 font-medium text-gray">
          <p>Request name</p>
          <p>Description</p>
          <p>Start date</p>
        </div>
        {requests.map((request) => (
          <RequestItemView variant={variant} request={request} />
        ))}
      </CardContent>
    </Card>
  );
}

export function RequestInfoCardList({
  cardTitle,
  className,
  requests,
}: {
  cardTitle: string;
  className?: string;
  requests: RequestInfo[];
}) {
  return (
    <Card className={cn("w-full py-0", className)} variant="solicitude">
      <CardHeader className="pt-5! text-h3 font-bold">{cardTitle}</CardHeader>
      <CardContent className="flex w-full flex-col gap-0 pt-0">
        {requests.map((request) => (
          <RequestInfoItem request={request} />
        ))}
      </CardContent>
    </Card>
  );
}
