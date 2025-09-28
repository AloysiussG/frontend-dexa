"use client";

import AttendanceDetail, {
  AttendanceDetails,
} from "@/components/cards/attendance-details-card";
import PageTitle from "@/components/headers/page-title";
import EmptyPlaceholder from "@/components/placeholders/empty-placeholder";
import ErrorPlaceholder from "@/components/placeholders/error-placeholder";
import LoadingPlaceholder from "@/components/placeholders/loading-placeholder";
import { ErrorType, useGetOneAttendance } from "@/hooks/use-queries";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export default function Page({ params }: Props) {
  const { id } = use(params);

  const { data: res, isLoading, error } = useGetOneAttendance(id || "-1");

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
          <PageTitle
            title="Attendance Details"
            description="View the employee attendance details here."
          />

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
          ) : !res?.data?.data ? (
            <div className="py-10 px-4">
              <EmptyPlaceholder
                title={"Not Found"}
                message={res?.data?.message}
              />
            </div>
          ) : (
            <div className="max-w-full">
              <AttendanceDetail
                data={
                  {
                    ...res?.data?.data,
                  } as AttendanceDetails
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
