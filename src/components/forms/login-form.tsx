import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@heroui/react";
import { Label } from "@/components/ui/label";
import PrimaryButton from "../buttons/primary-button";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 min-h-[28rem]">
          <form className="p-6 md:p-8 md:pb-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Dexa Group account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  variant="bordered"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  variant="bordered"
                  type="password"
                  required
                />
              </div>
              <div className="pt-2">
                <PrimaryButton type="submit">Login</PrimaryButton>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:flex">
            <Image
              className="dark:invert object-cover"
              src="/dexa-medica-2.jpg"
              alt="Banner"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        2025 Dexa Group — Built by Aloysius Gonzaga Seto Galih D. for Dexa Group
        Full-Stack Developer Skill Test
      </div>
    </div>
  );
}
