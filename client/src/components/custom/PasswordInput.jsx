import { useState } from "react";
import LabelInputContainer from "@/components/custom/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { cn } from "@/lib/utils";

export default function PasswordInput({ register, errors, className, params }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <LabelInputContainer className={cn("relative", className)}>
      <Label htmlFor={`${params}password`}>{`${params}`} Password</Label>
      <Input
        {...register(`${params}password`)}
        id={`${params}password`}
        placeholder="••••••••"
        type={showPassword ? "text" : "password"}
      />
      {errors[params + "password"] && (
        <ErrorMessage message={errors[params + "password"].message} />
      )}

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-6 h-6 w-6 text-neutral-400 dark:text-neutral-300"
      >
        <EyeOff className={`h-6 w-6 ${showPassword ? "hidden" : ""}`} />
        <Eye className={`h-6 w-6 ${showPassword ? "" : "hidden"}`} />
      </button>
    </LabelInputContainer>
  );
}
