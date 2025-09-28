"use client";

import PageTitle from "@/components/headers/page-title";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ErrorType, useGetCurrentAttendance } from "@/hooks/use-queries";
import LoadingPlaceholder from "@/components/placeholders/loading-placeholder";
import ErrorPlaceholder from "@/components/placeholders/error-placeholder";
import EmptyPlaceholder from "@/components/placeholders/empty-placeholder";
import DailyPresenceCard from "@/components/cards/daily-presence-card";

export type CurrentAttendanceDetailDtoResponse = {
  id?: number | null;
  name: string;
  role: string;
  date: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  status?: "Present" | "Late" | "Absent";
  workingHours?: string; // calculated from checkInTime and checkOutTime
  photoUrl?: string | null;
};

export default function Page() {
  const { data: res, isLoading, error } = useGetCurrentAttendance();

  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  );

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "yyyy-MM-dd HH:mm:ss")); // Example: Sep 24, 2025, 2:45:03 PM
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
          <PageTitle
            title="Daily Presence"
            description="Welcome to the daily presence dashboard."
          />

          {/* Current Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {currentTime &&
                  format(new Date(currentTime), "dd MMMM yyyy, HH:mm:ss a")}
              </p>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="p-10">
              <LoadingPlaceholder />
            </div>
          ) : error ? (
            <div className="py-10 px-4">
              <ErrorPlaceholder
                message={
                  (error as ErrorType).response?.data?.message ||
                  "An error occurred."
                }
              />
            </div>
          ) : !res?.data?.data || res?.data?.data?.length === 0 ? (
            <div className="py-10 px-4">
              <EmptyPlaceholder message={res?.data?.message} />
            </div>
          ) : (
            <DailyPresenceCard
              data={res?.data?.data as CurrentAttendanceDetailDtoResponse}
            />
          )}
        </div>
      </div>
    </div>
  );
}
