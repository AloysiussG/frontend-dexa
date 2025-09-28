"use client";

import { User } from "@/hooks/use-queries";
import { useQueryClient } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import { AuthGuardProps } from "./auth-guard";

export default function CheckAuth({
  children,
  roles,
  guestOnly,
}: AuthGuardProps) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);

  const auth = user?.email != null ? user : null;

  if (guestOnly && auth) {
    return redirect("/");
  }

  if (!guestOnly && !auth) {
    return redirect("/login");
  }

  if (!guestOnly && auth) {
    // if theres roles required, check the roles
    if (roles && !roles.includes(auth.role)) {
      return notFound();
    }
  }

  // if no roles required, its okay
  // if visiting guestOnly routes but no auth, its correct, proceed

  // all checks passed
  return children;
}
