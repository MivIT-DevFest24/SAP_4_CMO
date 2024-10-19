import SubmitButton from "@/components/custom/SubmitButton.jsx";
import PasswordInput from "@/components/custom/PasswordInput.jsx";
import ErrorMessage from "@/components/custom/ErrorMessage.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useResetPasswordMutatuion } from "@/hooks/react-query/useAuth.js";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const ResetPasswordMutatuion = useResetPasswordMutatuion();
  const { toast } = useToast();

  const ResetPasswordFormSchema = z.object({
    Newpassword: z.string().min(8).max(20),
    Confirmpassword: z.string().refine(
      (value) => {
        // Access the Newpassword value from the context
        const newPassword = getValues("Newpassword");

        // Check if Confirmpassword matches Newpassword
        return value === newPassword;
      },
      {
        message: "Passwords do not match",
        params: {
          Newpassword: z.string(),
        },
      }
    ),
  });

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      Newpassword: "",
      Confirmpassword: "",
    },
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await ResetPasswordMutatuion.mutateAsync({
        token: token,
        data: data,
      });
      toast({
        variant: "success",
        title: response.message,
      });
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="max-w-md w-96 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Reset your password
      </h2>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          register={register}
          errors={errors}
          className="mb-1"
          params="New"
        />
        <PasswordInput
          register={register}
          errors={errors}
          className="mb-6"
          params="Confirm"
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          text="Reset"
          loading="Reseting..."
        />

        {errors.root && <ErrorMessage message={errors.root.message} />}
      </form>
    </div>
  );
}
