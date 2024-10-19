import SubmitButton from "@/components/custom/SubmitButton.jsx";
import ErrorMessage from "@/components/custom/ErrorMessage.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForgotPasswordMutation } from "@/hooks/react-query/useAuth.js";
import { useToast } from "@/components/ui/use-toast.jsx";
import { useAuth } from "@/context/AuthContext.jsx";
import FormInput from "@/components/custom/FormInput.jsx";

const ChangePasswordFormSchema = z.object({
  email: z.string().email(),
});

export default function ForgetPassword() {
  const ForgotPasswordMutation = useForgotPasswordMutation();
  const { toast } = useToast();
  const { setOpenForgetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ChangePasswordFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await ForgotPasswordMutation.mutateAsync(data);
      toast({
        variant: "success",
        title: response.message,
      });
      // close the modal
      setOpenForgetPassword(false);
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
        Forgot Password
      </h2>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          errors={errors}
          id="email"
          name="Email"
          placeholder="Enter your email"
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          text="Send Reset Link"
          loading="Sending..."
        />

        {errors.root && <ErrorMessage message={errors.root.message} />}
      </form>
    </div>
  );
}
