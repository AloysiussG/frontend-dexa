import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  checkIn,
  checkOut,
  createEmployeeApi,
  deleteEmployeeApi,
  getAllAttendancesApi,
  getAllEmployeesApi,
  getCurrentAttendanceApi,
  getMainDashApi,
  getOneAttendanceApi,
  getOneEmployeeApi,
  getUserApi,
  loginApi,
  logoutApi,
  updateEmployeeApi,
} from "@/lib/services";
import { addToast } from "@heroui/react";
import { getHrefByName } from "@/lib/utils";
import { AxiosError, isAxiosError } from "axios";
import { LoginFormValues } from "@/components/forms/login-form";

export type Role = "HR" | "Employee";

export type User = {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

export type ErrorType = AxiosError<{ message: string }>;

export const onError = (error: ErrorType) => {
  addToast({
    title: error.response?.data?.message || "An error occurred.",
    color: "danger",
  });
};

// MAIN DASH

export function useGetMainDashboard() {
  return useQuery({
    queryKey: ["main-dash"],
    queryFn: async () => {
      return await getMainDashApi();
    },
  });
}

// DAILY PRESENCE

export type CreateAttendanceDtoRequest = {
  photoUrl: string;
};

export function useCheckIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAttendanceDtoRequest) => {
      return await checkIn(data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["attendances", "current"],
      });
      addToast({
        title: res.data?.message || "Check-in successful.",
      });
      router.push(getHrefByName("Daily Presence"));
    },
    onError,
  });
}

export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await checkOut(id);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["attendances", "current"],
      });
      addToast({
        title: res.data?.message || "Check-out successful.",
      });
    },
    onError,
  });
}

// ATTENDANCES

export function useGetCurrentAttendance() {
  return useQuery({
    queryKey: ["attendances", "current"],
    queryFn: async () => {
      return await getCurrentAttendanceApi();
    },
  });
}

export function useGetAllAttendances(date?: string) {
  return useQuery({
    queryKey: ["attendances", date],
    queryFn: async () => {
      return await getAllAttendancesApi(date);
    },
    placeholderData: keepPreviousData,
    retry: 0,
  });
}

export function useGetOneAttendance(id: string) {
  return useQuery({
    queryKey: ["attendances", id],
    queryFn: async () => {
      return await getOneAttendanceApi(id);
    },
  });
}

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
      router.push(getHrefByName("Employees"));
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
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      return await updateEmployeeApi(id, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      addToast({
        title: res.data?.message || "Employee updated successfully.",
      });
      router.push(getHrefByName("Employees"));
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
        if (isAxiosError(error) && error.response?.status === 401) {
          console.info("User not logged in");
        } else {
          console.error(error);
        }
        return null;
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
      queryClient.setQueryData(["user"], null);
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
