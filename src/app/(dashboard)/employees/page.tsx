"use client";

import AuthGuard from "@/components/guards/auth-guard";
import PageTitle from "@/components/headers/page-title";
import EmptyPlaceholder from "@/components/placeholders/empty-placeholder";
import ErrorPlaceholder from "@/components/placeholders/error-placeholder";
import LoadingPlaceholder from "@/components/placeholders/loading-placeholder";
import { EmployeeTable } from "@/components/tables/employee-table";
import { ErrorType, useGetAllEmployees } from "@/hooks/use-queries";

export default function Page() {
  const { data: res, isLoading, error } = useGetAllEmployees();

  return (
    <AuthGuard roles={["HR"]}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
            <PageTitle
              title="Employees"
              description="Manage your employees here."
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
            ) : !res?.data?.data || res?.data?.data?.length === 0 ? (
              <div className="py-10 px-4">
                <EmptyPlaceholder message={res?.data?.message} />
              </div>
            ) : (
              <EmployeeTable data={res?.data?.data} />
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
