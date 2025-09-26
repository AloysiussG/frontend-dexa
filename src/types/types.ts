import z from "zod";
import { schema } from "@/components/tables/employee-table";
import { attendanceSchema } from "@/components/tables/attendance-table";

export type Employee = z.infer<typeof schema>;
export type Attendance = z.infer<typeof attendanceSchema>;
