"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { I18nProvider } from "@react-aria/i18n";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { schema } from "../tables/employee-table";
import PrimaryButton from "../buttons/primary-button";
import { format } from "date-fns";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/use-queries";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const roles = [
  { label: "HR", value: "HR" },
  { label: "Employee", value: "Employee" },
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
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutateAsync: add } = useCreateEmployee();
  const { mutateAsync: edit } = useUpdateEmployee();

  const form = useForm<FormValues | FormValuesWithoutPassword>({
    resolver: zodResolver(
      withPassword ? formSchema : formSchemaWithoutPassword
    ),
    defaultValues: defaultValuesFromData || {
      name: "",
      email: "",
      password: "",
      role: "",
      hiredDate: format(new Date(), "yyyy-MM-dd"), // Default to today's date
    },
  });

  const onSubmit = async (data: FormValues | FormValuesWithoutPassword) => {
    if (defaultValuesFromData && defaultValuesFromData.id) {
      await edit({
        id: defaultValuesFromData?.id.toString(),
        data: data,
      });
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
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeIcon className="text-sm w-5 text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOffIcon className="text-sm w-5 text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
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
        <FormField
          control={form.control}
          name="hiredDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Hired Date</FormLabel>
              <I18nProvider locale="en-GB">
                <DatePicker
                  errorMessage={form.formState.errors.hiredDate?.message}
                  isInvalid={!!form.formState.errors.hiredDate}
                  aria-label="hired date"
                  aria-labelledby="hired date"
                  maxValue={today(getLocalTimeZone())}
                  variant="bordered"
                  showMonthAndYearPickers
                  className="max-w-xs"
                  value={field.value ? parseDate(field.value) : null} // Pass the Date object for compatibility
                  onChange={(value) => {
                    const formatted = format(
                      value?.toDate(getLocalTimeZone()) || new Date(),
                      "yyyy-MM-dd"
                    );
                    field.onChange(formatted);
                  }} // Convert selected date back to moment
                />
              </I18nProvider>
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
