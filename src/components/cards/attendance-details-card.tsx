"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconAlertCircleFilled,
  IconCalendar,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClockPlay,
  IconClockStop,
  IconHourglassHigh,
  IconLoader,
} from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";
import { Avatar } from "@heroui/react";
import { getInitials } from "@/lib/utils";

export type AttendanceDetails = {
  id: number;
  name: string;
  role: string;
  date: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  status: "Present" | "Late" | "Absent";
  workingHours?: string;
  photoUrl?: string | null;
  avatarUrl?: string;
};

export default function AttendanceCard({ data }: { data: AttendanceDetails }) {
  const {
    name,
    role,
    date,
    checkInTime,
    checkOutTime,
    status,
    workingHours,
    photoUrl,
    avatarUrl,
  } = data;

  return (
    <div className="mx-auto space-y-4">
      {/* User Details */}
      <Card>
        <CardHeader className="px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-6">
                <Avatar
                  showFallback={true}
                  name={getInitials(name || "")}
                  className="w-20 h-20 text-large"
                  src={avatarUrl || "/avatar.jpg"}
                />
                <div className="">
                  <CardTitle>{name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="flex flex-col items-start p-4">
        <div className="flex gap-6 justify-between w-full items-center">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconCalendar size={20} />
              <span className="text-xs font-medium">Date</span>
            </div>
            <p className="mt-1 text-lg md:text-2xl font-semibold">
              {date ? format(new Date(date), "dd MMMM yyyy") : "-"}
            </p>
          </div>
          <div className="">
            <Badge
              variant="outline"
              className="text-muted-foreground px-1.5 text-sm md:text-lg"
            >
              {status === "Present" ? (
                <span className="inline-block text-inherit leading-none">
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400 h-4 md:h-6" />
                </span>
              ) : status === "Late" ? (
                <span>
                  <IconAlertCircleFilled className="fill-yellow-500 dark:fill-green-400 h-4 md:h-6" />
                </span>
              ) : status === "Absent" ? (
                <span>
                  <IconCircleXFilled className="fill-red-500 dark:fill-green-400 h-4 md:h-6" />
                </span>
              ) : (
                <span>
                  <IconLoader className="h-4 md:h-6" />
                </span>
              )}
              {status}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <InfoCard
          icon={<IconClockPlay size={20} />}
          label="Check In"
          value={checkInTime ? checkInTime : "-"}
        />
        <InfoCard
          icon={<IconClockStop size={20} />}
          label="Check Out"
          value={checkOutTime ? checkOutTime : "-"}
        />
      </div>

      <InfoCard
        icon={<IconHourglassHigh size={20} />}
        label="Working Hours"
        value={workingHours ?? "-"}
      />

      {/* Photo Proof */}
      <Card>
        <CardHeader className="px-4 md:px-6">
          <CardTitle>Photo Proof</CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          {photoUrl ? (
            <Image
              width={1920}
              height={1080}
              src={photoUrl || ""}
              alt="Attendance Proof"
              className="rounded-xl w-full object-contain max-h-96"
            />
          ) : (
            <div className="w-full h-40 flex items-center justify-center border rounded-xl bg-muted text-sm text-muted-foreground">
              No photo proof
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Small reusable info card
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="flex flex-col items-start p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-1 text-lg md:text-2xl font-semibold">{value}</p>
    </Card>
  );
}
