import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getAllEmployeesApi,
  getOneEmployeeApi,
  getUserApi,
  loginApi,
  logoutApi,
  updateEmployeeApi,
} from "@/lib/services";
import { addToast } from "@heroui/react";
import { getHrefByName } from "@/lib/utils";
import { AxiosError } from "axios";
import { LoginFormValues } from "@/components/forms/login-form";

export type Role = "HR" | "Employee";

export type User = {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

export const onError = (error: AxiosError<{ message?: string }>) => {
  addToast({
    title: error.response?.data?.message || "An error occurred.",
    color: "danger",
  });
  console.error(error);
};

// EMPLOYEES

export function useCreateEmployee() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: unknown) => {
      return await createEmployeeApi(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      addToast({
        title: res.data?.message || "Employee added successfully.",
      });
      router.push("/profile/skills");
    },
    onError,
  });
}

export function useGetAllEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      return await getAllEmployeesApi();
    },
    retry: 0,
  });
}

export function useGetOneEmployee(id: string) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: async () => {
      return await getOneEmployeeApi(id);
    },
  });
}

export function useUpdateEmployee() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string, data: unknown) => {
      return await updateEmployeeApi(id, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      addToast({
        title: res.data?.message || "Employee updated successfully.",
      });
      router.push("/profile/skills");
    },
    onError,
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteEmployeeApi(id);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      addToast({
        title: res.data?.message || "Employee deleted successfully.",
      });
    },
    onError,
  });
}

// AUTH & CURRENT USER

export function useAuth() {
  const queryClient = useQueryClient();
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await getUserApi();
        return res.data?.data;
      } catch (error: unknown) {
        queryClient.setQueryData(["user"], null);
        console.error(error);
      }
    },
    retry: 0,
  });
}

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
    onError,
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
    onError,
  });
}
