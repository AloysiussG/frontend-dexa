import { CurrentAttendanceDetailDtoResponse } from "@/app/(dashboard)/daily-presence/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@heroui/react";
import Link from "next/link";
import { getHrefByName } from "@/lib/utils";
import { InfoCard } from "./attendance-details-card";
import {
  IconAlertCircleFilled,
  IconCalendar,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClockPlay,
  IconHourglassHigh,
  IconLoader,
} from "@tabler/icons-react";
import Image from "next/image";
import { format } from "date-fns";

export default function DailyPresenceCard({
  data,
}: {
  data: CurrentAttendanceDetailDtoResponse;
}) {
  const handleCheckOut = () => {};
  return (
    <>
      {/* Status */}
      {data?.status && (
        <InfoCard
          icon={<IconClockPlay size={20} />}
          label="Status"
          content={
            <Badge
              variant="outline"
              className="text-muted-foreground px-1.5 text-sm md:text-lg"
            >
              {data?.status === "Present" ? (
                <span className="inline-block text-inherit leading-none">
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 h-4 md:h-6" />
                </span>
              ) : data?.status === "Late" ? (
                <span>
                  <IconAlertCircleFilled className="fill-yellow-500 dark:fill-green-400 h-4 md:h-6" />
                </span>
              ) : data?.status === "Absent" ? (
                <span>
                  <IconCircleXFilled className="fill-red-500 dark:fill-green-400 h-4 md:h-6" />
                </span>
              ) : (
                <span>
                  <IconLoader className="h-4 md:h-6" />
                </span>
              )}
              {data?.status}
            </Badge>
          }
        />
      )}

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
        {/* Check-In */}
        <InfoCard
          icon={<IconClockPlay size={20} />}
          label="Check In"
          content={
            <div className="w-fit">
              {!data?.checkInTime ? (
                <>
                  <p className="text-muted-foreground">
                    You haven’t checked in yet for today.
                  </p>
                  <Button
                    variant="flat"
                    as={Link}
                    href={getHrefByName("Check-In")}
                  >
                    Check-In
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3 justify-start">
                  <Badge variant="default">Checked In</Badge>
                  <p className="font-medium">at {data?.checkInTime}</p>
                </div>
              )}
            </div>
          }
        />

        {/* Check-Out */}
        <InfoCard
          icon={<IconClockPlay size={20} />}
          label="Check Out"
          content={
            <div className="w-fit">
              {!data?.checkOutTime ? (
                <p className="text-muted-foreground">
                  Please check-in before checking out.
                </p>
              ) : !data?.checkOutTime ? (
                <>
                  <p className="text-muted-foreground">
                    You haven’t checked out yet today.
                  </p>
                  <Button variant="flat" onPress={handleCheckOut}>
                    Check-Out
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">Checked Out</Badge>
                  <p className="font-medium">at {data?.checkOutTime}</p>
                </div>
              )}
            </div>
          }
        />
      </div>

      {/* Worked hours summary */}
      {data?.workingHours != null && (
        <InfoCard
          icon={<IconHourglassHigh size={20} />}
          label="Working Hours"
          value={data?.workingHours ?? "-"}
        />
      )}

      {/* Photo Proof */}
      {data?.photoUrl != null && (
        <Card>
          <CardHeader className="px-4 md:px-6">
            <CardTitle>Photo Proof</CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <Image
              width={1920}
              height={1080}
              src={data?.photoUrl || ""}
              alt="Attendance Proof"
              className="rounded-xl w-full object-contain max-h-96"
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
