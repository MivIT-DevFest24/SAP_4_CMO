import SubmitButton from "@/components/custom/SubmitButton.jsx";
import FormInput from "@/components/custom/FormInput.jsx";
import PasswordInput from "@/components/custom/PasswordInput.jsx";
import ForgotPasswordLink from "@/components/custom/ForgotPasswordLink.jsx";
import ErrorMessage from "@/components/custom/ErrorMessage.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "@/hooks/react-query/useAuth.js";
import { setAccessToken } from "@/context/accessToken.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { createAxiosInstance } from "@/services/apiConfig.js";
import heroPic from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

const LoginFormSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().min(8).max(60),
});

export default function Home() {
  const { setConnected, setRole, setFirstName, setLastName } = useAuth();
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      setAccessToken(response.accessToken);
      setRole(response.role);
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setConnected(true);
      createAxiosInstance();
      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen gap-16">
      <img className="w-1/3" src={heroPic} alt="hero-pic" />
      <div className="w-fit flex flex-col items-left gap-4">
        <h1 className="text-6xl font-bold">
          Welcome to <br /> <span className="text-orange-500">Car-F</span>
        </h1>
        <h3 className="text-lg font-semibold">Log in to your account</h3>

        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register}
            errors={errors}
            id="email"
            name="Email or username"
            placeholder="example@carf.com"
            className="w-full"
          />
          <PasswordInput
            register={register}
            errors={errors}
            className="w-full"
            params=""
          />

          <ForgotPasswordLink />
          <SubmitButton
            isSubmitting={isSubmitting}
            text="Log in"
            loading="Logging in..."
            className="bg-orange-500 w-36"
          />

          {errors.root && <ErrorMessage message={errors.root.message} />}
        </form>
      </div>
    </div>
  );
}
