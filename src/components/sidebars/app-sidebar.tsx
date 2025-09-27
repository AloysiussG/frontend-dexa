"use client";

import * as React from "react";
import {
  IconCalendarEvent,
  IconDashboard,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/sidebars/navigations/nav-main";
import { NavUser } from "@/components/sidebars/navigations/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/use-queries";

const data = {
  navEmployee: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Daily Presence",
      url: "/daily-presence",
      icon: IconCalendarEvent,
    },
  ],
  navHR: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Daily Presence",
      url: "/daily-presence",
      icon: IconCalendarEvent,
    },
    {
      title: "Employees",
      url: "/employees",
      icon: IconUsers,
    },
    {
      title: "Attendances",
      url: "/attendances",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = useAuth();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2"
            >
              <Link href={"/"} className="">
                <Image
                  className="h-16 w-auto"
                  width={256}
                  height={64}
                  src="/logo-red.png"
                  alt="Dexa Group"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            currentUser?.role == "HR" ? data["navHR"] : data["navEmployee"]
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
