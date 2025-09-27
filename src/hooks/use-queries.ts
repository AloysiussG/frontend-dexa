import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi, logoutApi } from "@/lib/services";
import { addToast } from "@heroui/react";
import { getHrefByName } from "@/lib/utils";
import { AxiosError } from "axios";
import { LoginFormValues } from "@/components/forms/login-form";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await logoutApi();
    },
    onSuccess: (res) => {
      queryClient.removeQueries({ queryKey: ["user"] });
      addToast({
        title: res.data?.message || "Logout successful.",
      });
      router.push(getHrefByName("Login"));
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      addToast({
        title: error.response?.data?.message || "An error occurred.",
        color: "danger",
      });
      console.error(error);
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return await loginApi(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      addToast({
        title: res.data?.message || "Login successful.",
      });
      router.push(getHrefByName("Dashboard"));
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      addToast({
        title: error.response?.data?.message || "An error occurred.",
        color: "danger",
      });
      console.error(error);
    },
  });
}
