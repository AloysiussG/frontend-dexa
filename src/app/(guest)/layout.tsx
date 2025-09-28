import AuthGuard from "@/components/guards/auth-guard";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard guestOnly>{children}</AuthGuard>;
}
