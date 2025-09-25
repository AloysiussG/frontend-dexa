import z from "zod";
import { schema } from "@/components/tables/employee-table";

export type Employee = z.infer<typeof schema>;
