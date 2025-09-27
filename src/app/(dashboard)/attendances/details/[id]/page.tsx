"use client";

import AttendanceDetail from "@/components/cards/attendance-details-card";
import PageTitle from "@/components/headers/page-title";
import attendanceData from "@/data/attendance-data.json";
import { Attendance } from "@/types/types";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default function Page({ params }: Props) {
  const { id } = use(params);

  const attendance = (attendanceData as Attendance[]).find(
    (att) => att?.id === Number(id)
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
          <PageTitle
            title="Attendance Details"
            description="View the employee attendance details here."
          />
          <div className="max-w-full">
            <AttendanceDetail
              data={
                {
                  ...attendance,
                  // photoUrl: "/proofs/alice-checkin.jpg", // example
                } as Attendance
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
