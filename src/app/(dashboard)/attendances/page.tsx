import { DatePicker } from "@/components/calendars/datepicker";
import PageTitle from "@/components/headers/page-title";
import { AttendanceTable } from "@/components/tables/attendance-table";
import attendanceData from "@/data/attendance-data.json";
import { Attendance } from "@/types/types";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
          <PageTitle
            title="Attendances"
            description="View your employee attendances here."
          />
          <div className="">
            <DatePicker />
          </div>
          <AttendanceTable data={attendanceData as Attendance[]} />
        </div>
      </div>
    </div>
  );
}
