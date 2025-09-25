"use client";

import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="relative bg-gradient-to-br from-muted to-gray-300 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="z-999 w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
