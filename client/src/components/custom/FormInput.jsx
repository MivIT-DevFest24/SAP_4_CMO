import LabelInputContainer from "@/components/custom/LabelInputContainer.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import ErrorMessage from "@/components/custom/ErrorMessage.jsx";
import { cn } from "@/lib/utils";

export default function FormInput({
  register,
  errors,
  className,
  id,
  name,
  placeholder,
  number,
}) {
  return (
    <LabelInputContainer className={cn("mb-4", className)}>
      <Label htmlFor={id}>{name}</Label>
      <Input
        {...register(id)}
        id={id}
        placeholder={placeholder}
        type={number ? number : "text"}
      />
      {errors[id] && <ErrorMessage message={errors[id].message} />}
    </LabelInputContainer>
  );
}
