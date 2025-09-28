"use client";

import { Role } from "@/hooks/use-queries";
import { ReactNode } from "react";
import PersistentAuth from "./persistent-auth";
import CheckAuth from "./check-auth";

export type AuthGuardProps = {
  children: ReactNode;
  roles?: Role[];
  guestOnly?: boolean; // if true, only allow guests (like /login)
};

export default function AuthGuard({
  children,
  roles,
  guestOnly = false,
}: AuthGuardProps) {
  return (
    <PersistentAuth>
      <CheckAuth guestOnly={guestOnly} roles={roles}>
        {children}
      </CheckAuth>
    </PersistentAuth>
  );
  // // V2
  //   const { data: user, isLoading } = useAuth();
  //   const router = useRouter();
  //   useEffect(() => {
  //     if (!isLoading) {
  //       // guest-only routes (login)
  //       if (guestOnly && user) {
  //         router.replace("/"); // already logged in, kick back to home dashboard
  //         return;
  //       }
  //       // auth-required routes
  //       if (!guestOnly) {
  //         if (!user) {
  //           router.replace("/login"); // not logged in
  //         } else if (roles && !roles.includes(user.role)) {
  //           notFound(); // return to not found
  //         }
  //       }
  //     }
  //   }, [user, isLoading, roles, guestOnly, router]);
  //   if (isLoading)
  //     return (
  //       <div className="p-10 py-30">
  //         <LoadingPlaceholder />
  //       </div>
  //     );
  //   // all checks passed
  //   return <>{children}</>;
  // // V1
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
