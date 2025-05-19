import { Card, CardContent } from "@/app/components/shadcn/card";
import { cn } from "@/features/shadcn/services/utils";
import { faCircleCheck, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ActivityProcessStatus({
  status,
  className,
}: {
  status: boolean;
  className?: string;
}) {
  return (
    <Card variant="solicitude" className={cn("w-full items-center justify-center py-9", className)}>
      <CardContent className="flex flex-col items-center justify-center">
        {status && (
          <>
            <FontAwesomeIcon icon={faCircleCheck} className="text-h1 text-success" />
            <p>
              This activity was <b> complete</b> on <b>date/of/finalization</b>.
            </p>
          </>
        )}
        {!status && (
          <>
            <FontAwesomeIcon icon={faClock} className="text-h1 text-gray" />
            <p>
              This activity is <b>in process</b>. It is expected to finish on
              <b>date/of/finalization</b>.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
