import MachineCard from "@/components/custom/MachineCard";
import machines from "/src/machines.js";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
export default function Machines() {
  const [search, setSearch] = useState("");
  const [filteredMachines, setFilteredMachines] = useState(
    Object.entries(machines)
  );

  useEffect(() => {
    const filteredMachines = Object.entries(machines).filter((machine) =>
      machine[1].name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMachines(
      filteredMachines.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {})
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[28rem] self-end">
        <Input
          placeholder="Filter machines..."
          className="w-full border border-neutral-500 focus-visible:ring-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(filteredMachines).map(([key, machine]) => (
          <MachineCard key={key} machine={machine} />
        ))}
      </div>
    </div>
  );
}
