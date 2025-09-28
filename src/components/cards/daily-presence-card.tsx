"use client";

import { CurrentAttendanceDetailDtoResponse } from "@/app/(dashboard)/daily-presence/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@heroui/react";
import Link from "next/link";
import { getHrefByName } from "@/lib/utils";
import { InfoCard } from "./attendance-details-card";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClockPlay,
  IconHourglassHigh,
  IconLoader,
} from "@tabler/icons-react";
import Image from "next/image";
import { BadgeCheckIcon } from "lucide-react";
import { useCheckOut } from "@/hooks/use-queries";

export default function DailyPresenceCard({
  data,
}: {
  data: CurrentAttendanceDetailDtoResponse;
}) {
  const { mutateAsync: checkOut, isPending } = useCheckOut();

  const handleCheckOut = async () => {
    if (data?.id) {
      await checkOut(data?.id?.toString());
    }
  };

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
              {data?.status} {data?.lateDuration ? data?.lateDuration : ""}
            </Badge>
          }
        />
      )}

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
        {/* Check-In */}
        <InfoCard
          icon={<IconClockPlay size={20} />}
          label="Check In"
          value={data?.checkInTime ? data?.checkInTime : undefined}
          content={
            <div className="w-fit">
              {!data?.checkInTime ? (
                <div className="flex flex-col gap-4">
                  <p className="text-muted-foreground">
                    You haven’t checked in yet for today.
                  </p>
                  <Button
                    className="bg-neutral-800 text-white hover:bg-neutral-700"
                    variant="flat"
                    as={Link}
                    href={getHrefByName("Check-In")}
                  >
                    Check-In
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 justify-start">
                  <Badge variant="secondary">
                    <BadgeCheckIcon />
                    Checked In
                  </Badge>
                </div>
              )}
            </div>
          }
        />

        {/* Check-Out */}
        <InfoCard
          icon={<IconClockPlay size={20} />}
          label="Check Out"
          value={data?.checkOutTime ? data?.checkOutTime : undefined}
          content={
            <div className="w-fit">
              {!data?.checkInTime ? (
                <p className="text-muted-foreground">
                  Please check-in first before checking out.
                </p>
              ) : !data?.checkOutTime ? (
                <div className="flex flex-col gap-4">
                  <p className="text-muted-foreground">
                    You haven’t checked out yet today.
                  </p>
                  <Button
                    className="bg-neutral-800 text-white hover:bg-neutral-700"
                    variant="flat"
                    onPress={handleCheckOut}
                    isLoading={isPending}
                  >
                    Check-Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    <BadgeCheckIcon />
                    Checked Out
                  </Badge>
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
