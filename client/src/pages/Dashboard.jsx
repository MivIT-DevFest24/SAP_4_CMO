import Barchart from "@/components/dashboard/Barchart";
import LineChart from "@/components/dashboard/LineChart.jsx";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 mb-12">
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <h1 className="text-lg font-semibold">
            Cost of financial year of last year (calculated in thousands)
          </h1>
          <LineChart />
        </div>
        <div className="w-full">
          <h1 className="text-lg font-semibold">
            Energy Consumption of last week (calculated in kWh)
          </h1>
          <Barchart />
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-semibold">
          Number of products produced in the last year
        </h1>
        <LineChart />
      </div>
    </div>
  );
}
