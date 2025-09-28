"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardBreadcrumb from "../breadcrumbs/dashboard-breadcrumb";
import { useAuth, useLogout } from "@/hooks/use-queries";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { Button } from "@heroui/react";

export function SiteHeader() {
  const { data: currentUser } = useAuth();
  const { mutateAsync: logout, isPending } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DashboardBreadcrumb />
        <h3 className="ml-auto mr-1 flex items-center gap-2 text-sm font-medium leading-snug">
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
        <Button
          size="sm"
          variant="light"
          color="danger"
          isLoading={isPending}
          isIconOnly
          onPress={handleLogout}
          aria-label="Log out"
        >
          <IconLogout className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
