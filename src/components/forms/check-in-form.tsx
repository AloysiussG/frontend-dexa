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
  FormMessage,
} from "@/components/ui/form";
import PrimaryButton from "../buttons/primary-button";
import ImageDropzone from "../dropzones/image-dropzone";
import { useCheckIn } from "@/hooks/use-queries";

const formSchema = z
  .object({
    checkInImage: z.object({
      url: z
        .string()
        .trim()
        .min(1, { message: "Proof of presence image is required" }),
      id: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.checkInImage.url) {
      ctx.addIssue({
        code: "custom",
        path: ["checkInImage"],
        message: "Proof of presence image is required",
      });
    }
  });
type FormValues = z.infer<typeof formSchema>;

export default function CheckInForm({
  defaultValuesFromData,
}: {
  defaultValuesFromData?: Partial<FormValues>;
}) {
  const { mutateAsync: add } = useCheckIn();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesFromData || {
      checkInImage: {
        id: "",
        url: "",
      },
    },
  });

  const onSubmit = async (data: FormValues) => {
    await add({
      photoUrl: data?.checkInImage.url,
    });
  };

  const onSubmitError = () =>
    // error: unknown
    {
      console.info("Form Validation Error");
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
                    onRemoveFileCallback={() =>
                      field.onChange({
                        id: "",
                        url: "",
                      })
                    }
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
            className="w-fit min-w-32"
            type="submit"
          >
            Check-In
          </PrimaryButton>
        </div>
      </form>
    </Form>
  );
}
