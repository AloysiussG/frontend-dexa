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
  FormMessage,
} from "@/components/ui/form";
import { addToast, DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { schema } from "../tables/employee-table";
import PrimaryButton from "../buttons/primary-button";
import { format } from "date-fns";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import ImageDropzone from "../dropzones/image-dropzone";

const roles = [
  { label: "HR", value: "HR" },
  { label: "Employee", value: "Employee" },
] as const;

const formSchema = z.object({
  checkInImage: z.string().min(1, { message: "Check-In Image is required" }),
});
type FormValues = z.infer<typeof formSchema>;

export default function CheckInForm({
  defaultValuesFromData,
  withPassword = true,
}: {
  defaultValuesFromData?: Partial<FormValues>;
  withPassword?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: add } = useMutation({
    mutationFn: async (data: FormValues) => {
      return await axios.post(`/api/daily-presence/check-in`, data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["daily-presence"],
      });
      addToast({
        title: res.data?.message,
      });
      router.push("/dashboard/daily-presence");
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
    defaultValues: defaultValuesFromData || {
      checkInImage: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await add(data);
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
          name="checkInImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proof of Presence</FormLabel>
              <FormControl>
                <div>
                  <ImageDropzone
                    aspectRatio="16:9"
                    onDropCallback={field.onChange}
                    onRemoveFileCallback={() => field.onChange(null)}
                    imgPreview={field.value}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2">
          <PrimaryButton
            isLoading={form.formState.isSubmitting}
            className="w-fit"
            type="submit"
          >
            Check-In
          </PrimaryButton>
        </div>
      </form>
    </Form>
  );
}
