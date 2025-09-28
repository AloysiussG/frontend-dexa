"use client";

import { LoginForm } from "@/components/forms/login-form";
import AuthGuard from "@/components/guards/auth-guard";

export default function LoginPage() {
  return (
    <AuthGuard guestOnly>
      <div className="relative bg-gradient-to-br from-blue-200 via-white to-red-200 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="z-999 w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </AuthGuard>
  );
}
