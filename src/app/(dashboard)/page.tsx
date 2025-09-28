"use client";

import SectionCard from "@/components/cards/section-card";
import {
  IconArrowUpRight,
  IconCalendar,
  IconCheck,
  IconClock,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";
import PageTitle from "@/components/headers/page-title";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Card } from "@heroui/react";
import { getHrefByName } from "@/lib/utils";
import { ErrorType, useGetMainDashboard } from "@/hooks/use-queries";
import LoadingPlaceholder from "@/components/placeholders/loading-placeholder";
import ErrorPlaceholder from "@/components/placeholders/error-placeholder";
import EmptyPlaceholder from "@/components/placeholders/empty-placeholder";

export type GetDashboardDtoResponse = {
  role: string;
  employeesCount?: string;
  attendancesCount?: string;
};

export default function Page() {
  const { data: res, isLoading, error } = useGetMainDashboard();
  const dashData = res?.data?.data as GetDashboardDtoResponse;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 md:gap-6 md:px-6">
            <PageTitle
              title="Overview"
              description="Welcome to the main dashboard. You can see all the working hour rules and some overview panels."
            />
          </div>

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
            <>
              {/* Employee View */}
              {(dashData?.role === "Employee" || dashData?.role === "HR") && (
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-5">
                  <SectionCard
                    cardTitle={"08.15"}
                    cardDescription="Max. Check-In"
                    cardAction={<IconCalendar size={28} />}
                  />
                  <SectionCard
                    cardTitle={"17.00"}
                    cardDescription="Min. Check-Out"
                    cardAction={<IconClock size={28} />}
                  />
                  <SectionCard
                    cardTitle={"8h 45m"}
                    cardDescription="Std. Working Hours"
                    cardAction={<IconCheck size={28} />}
                  />
                  <Link
                    href={getHrefByName("Daily Presence")}
                    className="block @xl/main:col-span-3 @5xl/main:col-span-2"
                  >
                    <Card className="flex items-start justify-between rounded-2xl p-5 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold">
                          Daily Presence
                        </span>
                        <span className="text-sm text-neutral-300">
                          Go to the Daily Presence section
                        </span>
                      </div>
                      <IconArrowUpRight className="mt-10 w-6 h-6 shrink-0" />
                    </Card>
                  </Link>
                </div>
              )}

              {/* HR View */}
              {dashData?.role === "HR" && (
                <>
                  <div className="px-4 md:gap-6 md:px-6">
                    <Separator />
                  </div>
                  <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <SectionCard
                      cardTitle={
                        dashData?.employeesCount
                          ? dashData?.employeesCount
                          : "0"
                      }
                      cardDescription="Employees"
                      cardAction={<IconUsers size={28} />}
                      cardFooter={
                        <Link
                          href={getHrefByName("Employees")}
                          className="block w-full"
                        >
                          <Card className="flex flex-row items-center justify-between rounded-2xl p-4 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
                            <span className="text-base font-semibold">
                              Manage
                            </span>
                            <IconArrowUpRight className="w-6 h-6 shrink-0" />
                          </Card>
                        </Link>
                      }
                    />
                    <SectionCard
                      cardTitle={
                        dashData?.attendancesCount
                          ? dashData?.attendancesCount
                          : "0"
                      }
                      cardDescription="Today Attendances"
                      cardAction={<IconListDetails size={28} />}
                      cardFooter={
                        <Link
                          href={getHrefByName("Attendances")}
                          className="block w-full"
                        >
                          <Card className="flex flex-row items-center justify-between rounded-2xl p-4 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
                            <span className="text-base font-semibold">
                              Manage
                            </span>
                            <IconArrowUpRight className="w-6 h-6 shrink-0" />
                          </Card>
                        </Link>
                      }
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
