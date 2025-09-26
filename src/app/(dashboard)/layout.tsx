"use client";

import { SiteHeader } from "@/components/headers/app-header";
import { AppSidebar } from "@/components/sidebars/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-gradient-to-br from-transparent via-transparent to-red-200/25">
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
