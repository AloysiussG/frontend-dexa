"use client";

import PageTitle from "@/components/headers/page-title";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInMinutes, format } from "date-fns";
import { Button } from "@heroui/react";
import Link from "next/link";
import { getHrefByName } from "@/lib/utils";

export default function Page() {
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "yyyy-MM-dd HH:mm:ss")
  );
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkedOut, setCheckedOut] = useState<boolean>(false);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "yyyy-MM-dd HH:mm:ss")); // Example: Sep 24, 2025, 2:45:03 PM
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCheckInTime(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    // TODO: route to check-in page with image upload
  };

  const handleCheckOut = () => {
    setCheckedOut(true);
    setCheckOutTime(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  };

  const workedMinutes =
    checkInTime && checkOutTime
      ? differenceInMinutes(checkOutTime, checkInTime)
      : null;

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
                  format(new Date(currentTime), "dd MMMM yyyy, h:mm:ss a")}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
            {/* Check-In */}
            <Card>
              <CardHeader>
                <CardTitle>Check-In</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {!checkedIn ? (
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
                  <div className="flex items-center gap-3">
                    <Badge variant="default">Checked In</Badge>
                    <p className="font-medium">
                      at{" "}
                      {checkInTime &&
                        format(
                          new Date(checkInTime),
                          "dd MMMM yyyy, h:mm:ss a"
                        )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Check-Out */}
            <Card>
              <CardHeader>
                <CardTitle>Check-Out</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {!checkedIn ? (
                  <p className="text-muted-foreground">
                    Please check-in before checking out.
                  </p>
                ) : !checkedOut ? (
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
                    <p className="font-medium">
                      at{" "}
                      {checkOutTime &&
                        format(
                          new Date(checkOutTime),
                          "dd MMMM yyyy, h:mm:ss a"
                        )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Worked hours summary */}
          {workedMinutes !== null && (
            <div className="rounded-lg bg-muted p-3 text-sm">
              ⌛ Total worked:{" "}
              <span className="font-medium">
                {Math.floor(workedMinutes / 60)}h {workedMinutes % 60}m
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
