"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { addToast, Input, Select, SelectItem } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { schema } from "../tables/employee-table";
import PrimaryButton from "../buttons/primary-button";

const roles = [
  { label: "HR", value: "HR" },
  { label: "Employee", value: "EMPLOYEE" },
] as const;

const formSchema = schema.omit({ id: true }); // Omit 'id' for form validation as it's not needed when adding/editing
const formSchemaWithoutPassword = formSchema.omit({ password: true }); // Omit 'password' for edit form validation
type FormValues = z.infer<typeof formSchema>;
type FormValuesWithoutPassword = Omit<FormValues, "password">;
type FormValuesExtendedProps = FormValues & { id?: number };

export default function EmployeeForm({
  defaultValuesFromData,
  withPassword = true,
}: {
  defaultValuesFromData?: Partial<FormValuesExtendedProps>;
  withPassword?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: add } = useMutation({
    mutationFn: async (data: FormValues | FormValuesWithoutPassword) => {
      return await axios.post(`/api/employees`, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      addToast({
        title: res.data?.message,
      });
      router.push("/dashboard/employees");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      addToast({
        title: error.response?.data?.message || "An error occurred.",
        color: "danger",
      });
      console.error(error);
    },
  });
  const { mutateAsync: edit } = useMutation({
    mutationFn: async (data: FormValues | FormValuesWithoutPassword) => {
      return await axios.put(
        `/api/employees/${defaultValuesFromData?.id}`,
        data
      );
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      addToast({
        title: res.data?.message,
        color: "default",
      });
      router.push("/dashboard/employees");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      addToast({
        title: error.response?.data?.message || "An error occurred.",
        color: "danger",
      });
      console.error(error);
    },
  });

  const form = useForm<FormValues | FormValuesWithoutPassword>({
    resolver: zodResolver(
      withPassword ? formSchema : formSchemaWithoutPassword
    ),
    defaultValues: defaultValuesFromData || {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data: FormValues | FormValuesWithoutPassword) => {
    if (defaultValuesFromData) {
      await edit(data);
    } else {
      await add(data);
    }
  };

  const onSubmitError = (error: unknown) => {
    console.error(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="gap-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  variant="bordered"
                  id="name"
                  placeholder="e.g. John Doe"
                  {...field}
                  errorMessage={form.formState.errors.name?.message}
                  isInvalid={!!form.formState.errors.name}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  variant="bordered"
                  id="email"
                  placeholder="e.g. john.worker@dexagroup.com"
                  {...field}
                  errorMessage={form.formState.errors.email?.message}
                  isInvalid={!!form.formState.errors.email}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {withPassword && (
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
                    placeholder="Enter the employee's password"
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Role</FormLabel>
              <Select
                errorMessage={form.formState.errors.role?.message}
                isInvalid={!!form.formState.errors.role}
                aria-label="select-role"
                aria-labelledby="select-role"
                placeholder="Select the role"
                variant="bordered"
                className="max-w-xs"
                disallowEmptySelection
                selectedKeys={
                  field.value ? new Set([field.value]) : new Set([])
                }
                onSelectionChange={(selectedKeys) => {
                  // Extract the value from Set and update the form value
                  const selectedValue = Array.from(selectedKeys).join(""); // Assuming single selection
                  form.setValue("role", selectedValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {roles.map((role) => (
                  <SelectItem key={role.value}>{role.label}</SelectItem>
                ))}
              </Select>
            </FormItem>
          )}
        />
        <div className="mt-2">
          <PrimaryButton
            isLoading={form.formState.isSubmitting}
            className="w-fit"
            type="submit"
          >
            {defaultValuesFromData ? "Edit" : "Add"} Employee
          </PrimaryButton>
        </div>
      </form>
    </Form>
  );
}
