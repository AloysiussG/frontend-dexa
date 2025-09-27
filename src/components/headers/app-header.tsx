"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardBreadcrumb from "../breadcrumbs/dashboard-breadcrumb";
import { useAuth } from "@/hooks/use-queries";
import { IconUserCircle } from "@tabler/icons-react";

export function SiteHeader() {
  const { data: currentUser } = useAuth();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DashboardBreadcrumb />
        <h3 className="ml-auto flex items-center gap-2 text-sm font-medium leading-snug">
          {currentUser?.role === "HR" ? (
            <span className="flex items-center gap-2 bg-red-100 text-red-600 rounded-full px-3 py-1">
              <IconUserCircle className="w-5 h-5" /> HR
            </span>
          ) : currentUser?.role === "Employee" ? (
            <span className="flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-3 py-1">
              <IconUserCircle className="w-5 h-5" /> Employee
            </span>
          ) : (
            <></>
          )}
        </h3>
      </div>
    </header>
  );
}
