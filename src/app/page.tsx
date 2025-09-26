"use client";

import PrimaryButton from "@/components/buttons/primary-button";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="relative flex min-h-screen items-center bg-cover bg-center px-10"
      style={{
        backgroundImage: "url('/home-banner.webp')", // put your banner image in /public/banner.jpg
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-lg text-left">
        <h1 className="text-5xl font-bold mb-6">Welcome</h1>
        <p className="text-xl mb-8">
          Manage your system effortlessly. Login to access the admin dashboard.
        </p>
        <PrimaryButton
          className="w-fit text-xl h-fit p-3 px-5 items-center"
          size="lg"
          onPress={() => router.push("/login")}
        >
          Continue <IconChevronRight />
        </PrimaryButton>
      </div>
    </main>
  );
}
