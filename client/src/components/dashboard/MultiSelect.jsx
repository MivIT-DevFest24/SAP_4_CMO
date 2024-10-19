import { Button } from "@/components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorMessage from "../custom/ErrorMessage.jsx";

export default function MultiSelect({
  topic,
  items,
  value,
  onChange,
  errors,
  id,
}) {
  const [updatePreview, setUpdatePreview] = useState(false);
  const [listOfShifts, setListOfShifts] = useState(value ? value : []);
  useEffect(() => {
    onChange(listOfShifts);
    setUpdatePreview(!updatePreview);
  }, [listOfShifts]);

  return (
    <div>
      <DropdownMenu>
        <div className="text-sm self-center text-black dark:text-white">
          {topic}:
        </div>
        <DropdownMenuTrigger asChild>
          <Button className="flex gap-2" variant="outline">
            {listOfShifts.length === 0
              ? "Select sectors"
              : listOfShifts.join(", ")}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {items.map((item, idx) => (
            <DropdownMenuCheckboxItem
              key={idx}
              value={item}
              checked={listOfShifts.includes(item)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setListOfShifts([...listOfShifts, item]);
                } else {
                  setListOfShifts(
                    listOfShifts.filter((sector) => sector !== item)
                  );
                }
              }}
            >
              {item}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {id && errors[id] && <ErrorMessage message={errors[id].message} />}
    </div>
  );
}
