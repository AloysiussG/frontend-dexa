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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Daily Presence",
      url: "/dashboard/daily-presence",
      icon: IconCalendarEvent,
    },
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: IconUsers,
    },
    {
      title: "Attendances",
      url: "/dashboard/attendances",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="">
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
