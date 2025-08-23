import { RequestItemView } from "@/app/app/request/components/request-item";
import { Card, CardContent, CardHeader } from "@/app/components/shadcn/card";
import { RequestPatternRead } from "@/features/request-pattern/types/request-pattern";
import { cn } from "@/features/shadcn/services/utils";

export function RequestCardList({
  cardTitle,
  className,
  requests,
  variant,
}: {
  cardTitle: string;
  className?: string;
  requests: RequestPatternRead[];
  variant: "published" | "unpublished" | "default";
}) {
  return (
    <Card className={cn("mx-0 w-full py-0", className)} variant="solicitude">
      <CardHeader className="pt-5! text-h3 font-bold">{cardTitle}</CardHeader>
      <CardContent className="flex w-full flex-col gap-0 pt-0">
        <div className="grid w-full grid-cols-4 items-center justify-between gap-2 pl-4 font-medium text-gray">
          <p>Request name</p>
          <p>Description</p>
          <p>Start date</p>
        </div>
        {requests.map((request) => (
          <RequestItemView
            key={request.requestPatternId}
            variant={variant}
            request={{
              id: request.requestPatternId,
              name: request.label,
              description: request.description,
              startDate: new Date(request.createdAt),
              isPublished: request.publishedAt ? true : false,
            }}
          />
        ))}
        {requests.length === 0 && (
          <div className="flex h-20 w-full items-center justify-center">
            <p className="text-center text-gray-500">No requests available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
