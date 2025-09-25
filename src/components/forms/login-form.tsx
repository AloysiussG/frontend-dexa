import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { addToast, Input } from "@heroui/react";
import PrimaryButton from "../buttons/primary-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import z from "zod";
import axios from "@/lib/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .trim()
    .min(1, { message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: login } = useMutation({
    mutationFn: async (data: FormValues) => {
      return await axios.post(`/api/login`, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      addToast({
        title: res.data?.message,
      });
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      addToast({
        title: error.response?.data?.message || "An error occurred.",
        color: "danger",
      });
      console.error(error);
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await login(data);
  };

  const onSubmitError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none">
        <CardContent className="grid p-0 md:grid-cols-2 min-h-[28.5rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
              className="p-6 md:p-8 md:pb-10"
            >
              <div className="flex flex-col gap-6 h-full">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome!</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Dexa Group account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="gap-3">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          variant="bordered"
                          placeholder="m@example.com"
                          {...field}
                          errorMessage={form.formState.errors.email?.message}
                          isInvalid={!!form.formState.errors.email}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="gap-3">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          variant="bordered"
                          id="password"
                          {...field}
                          errorMessage={
                            "password" in form.formState.errors
                              ? form.formState.errors.password?.message
                              : undefined
                          }
                          isInvalid={
                            "password" in form.formState.errors &&
                            !!form.formState.errors.password
                          }
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-auto">
                  <PrimaryButton type="submit">Login</PrimaryButton>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:flex">
            <Image
              className="dark:invert object-cover object-center"
              src="/dexa-medica-3.jpg"
              alt="Banner"
              width={1920}
              height={1080}
              priority
            />

            {/* Vignette Overlay */}
            <div className="dark:invert absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75 pointer-events-none" />

            <Image
              className="dark:invert object-contain absolute top-6 right-6 w-1/4"
              src="/logo-white.png"
              alt="Logo Dexa Group"
              width={1920}
              height={1080}
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
