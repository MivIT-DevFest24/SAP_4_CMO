import LabelInputContainer from "@/components/custom/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { cn } from "@/lib/utils";

export default function FormTextarea({
  register,
  errors,
  className,
  id,
  name,
  placeholder,
}) {
  return (
    <LabelInputContainer className={cn("mb-4", className)}>
      <Label htmlFor={id}>{name}</Label>
      <Textarea className={className} {...register(id)} id={id} placeholder={placeholder} />
      {errors[id] && <ErrorMessage message={errors[id].message} />}
    </LabelInputContainer>
  );
}
