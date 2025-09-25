import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
}

export const BREADCRUMBS_ROUTES = [
  { name: "Dashboard", href: "/dashboard", segment: "dashboard" },
  {
    name: "Daily Presence",
    href: "/dashboard/daily-presence",
    segment: "daily-presence",
  },
  {
    name: "Check-In",
    href: "/dashboard/daily-presence/check-in",
    segment: "check-in",
  },
  { name: "Employees", href: "/dashboard/employees", segment: "employees" },
  { name: "Add Employee", href: "/dashboard/employees/add", segment: "add" },
  { name: "Edit Employee", href: "/dashboard/employees/edit", segment: "edit" },
  {
    name: "Attendances",
    href: "/dashboard/attendances",
    segment: "attendances",
  },
];
