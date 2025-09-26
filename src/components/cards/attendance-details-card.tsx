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
import {
  differenceInHours,
  differenceInMinutes,
  format,
  parse,
} from "date-fns";
import Image from "next/image";
import { Avatar } from "@heroui/react";
import { getInitials } from "@/lib/utils";

type Attendance = {
  id: number;
  userId?: number;
  name: string;
  role: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string | null;
  status: string;
  photoUrl?: string;
  avatarUrl?: string;
};

export default function AttendanceCard({ data }: { data: Attendance }) {
  const {
    name,
    role,
    date,
    checkInTime,
    checkOutTime,
    status,
    photoUrl,
    avatarUrl,
  } = data;

  // calculate working hours
  let workingHours: string | null = null;
  if (checkOutTime) {
    const checkIn = parse(checkInTime, "yyyy-MM-dd HH:mm:ss", new Date());
    const checkOut = parse(checkOutTime, "yyyy-MM-dd HH:mm:ss", new Date());
    const hours = differenceInHours(checkOut, checkIn);
    const minutes = differenceInMinutes(checkOut, checkIn) % 60;
    workingHours = `${hours}h ${minutes}m`;
  }

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
                  src={avatarUrl}
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
          value={checkInTime ? format(new Date(checkInTime), "HH:mm:ss") : "-"}
        />
        <InfoCard
          icon={<IconClockStop size={20} />}
          label="Check Out"
          value={
            checkOutTime ? format(new Date(checkOutTime), "HH:mm:ss") : "-"
          }
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
              src={photoUrl}
              alt="Attendance Proof"
              className="rounded-xl border w-full object-cover max-h-64"
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
