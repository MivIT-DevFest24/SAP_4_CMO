import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessage from "../custom/ErrorMessage";

export default function ProductSelector({
  topic,
  items,
  value,
  errors,
  setValue,
  id,
}) {
  return (
    <div>
      <Select
        defaultValue={value}
        onValueChange={(value) => setValue(id, value)}
      >
        <div className="text-sm self-center text-black dark:text-white">
          {topic}:
        </div>
        <SelectTrigger className=" dark:bg-darky dark:border-darky">
          <SelectValue
            className="w-full"
            placeholder={`select ${topic}`}
            value={value}
          />
        </SelectTrigger>
        <SelectContent className="dark:bg-darky dark:border-darky">
          {items.map((item, idx) => (
            <SelectItem key={idx} value={item}>
              <div className="flex items-center justify-center gap-2">
                <p>{item}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
        {id && errors[id] && <ErrorMessage message={errors[id].message} />}
      </Select>
    </div>
  );
}
