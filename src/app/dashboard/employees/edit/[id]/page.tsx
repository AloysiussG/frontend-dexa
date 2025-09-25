import EmployeeForm from "@/components/forms/employee-form";
import PageTitle from "@/components/headers/page-title";
import employeeData from "@/data/employee-data.json";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const id = params?.id;

  const employee = employeeData.find(
    (emp: { id: number; name: string; email: string; role: string }) =>
      emp?.id === Number(id)
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 md:px-6">
          <PageTitle
            title="Edit Employee"
            description="Add or edit your employees here."
          />
          <div className="max-w-xl">
            <EmployeeForm defaultValuesFromData={employee} />
          </div>
        </div>
      </div>
    </div>
  );
}
