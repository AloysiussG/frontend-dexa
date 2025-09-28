"use client";

import { Role, useAuth } from "@/hooks/use-queries";
import { notFound, redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import LoadingPlaceholder from "../placeholders/loading-placeholder";

type Props = {
  children: ReactNode;
  roles?: Role[];
  guestOnly?: boolean; // if true, only allow guests (like /login)
};

export default function AuthGuard({ children, roles, guestOnly }: Props) {
  const { data: user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // guest-only routes (login)
      if (guestOnly && user) {
        router.replace("/"); // already logged in, kick back to home dashboard
        return;
      }

      // auth-required routes
      if (!guestOnly) {
        if (!user) {
          router.replace("/login"); // not logged in
        } else if (roles && !roles.includes(user.role)) {
          notFound(); // return to not found
        }
      }
    }
  }, [user, isLoading, roles, guestOnly, router]);

  if (isLoading)
    return (
      <div className="p-10 py-30">
        <LoadingPlaceholder />
      </div>
    );

  // all checks passed
  return <>{children}</>;

  //   // 1. Still loading, block everything
  //   if (isLoading) {
  //     return (
  //       <div className="p-10 py-30">
  //         <LoadingPlaceholder />
  //       </div>
  //     );
  //   }

  //   // 2. Guest-only (like /login)
  //   if (guestOnly) {
  //     if (user) {
  //       // already logged in, redirect to dashboard
  //       redirect("/");
  //     }
  //     return <>{children}</>; // guest is allowed
  //   }

  //   // 3. Auth-required
  //   if (!user) {
  //     redirect("/login");
  //   }

  //   if (roles && !roles.includes(user.role)) {
  //     notFound();
  //   }

  //   // 4. All checks passed
  //   return <>{children}</>;
}
