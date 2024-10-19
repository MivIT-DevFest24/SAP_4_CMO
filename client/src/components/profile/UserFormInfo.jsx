import FormInput from "@/components/custom/FormInput.jsx";
import ErrorMessage from "@/components/custom/ErrorMessage.jsx";
import { useAuth } from "@/context/AuthContext.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast.jsx";

import { Button } from "@/components/ui/button.jsx";

import { useState } from "react";
import { Suspense } from "react";

import loading_gif from "@/assets/images/Loading-icon-unscreen.gif";
import { ChangePassword } from "@/components/shared/ChangePassword.jsx";
import FormModal from "@/components/custom/FormModal.jsx";
import ForgetPassword from "../shared/ForgetPassword.jsx";

const ProfilInfoFormSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

export default function UserFormInfo({ userInfo }) {
  const { toast } = useToast();
  const { setFirstName, openForgetPassword, setOpenForgetPassword } =
    useAuth();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      username: userInfo.username,
      email: userInfo.email,
    },
    resolver: zodResolver(ProfilInfoFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      setFirstName(getValues("firstname"));
      // Show success message
      toast({
        variant: "success",
        title: "Profile updated successfully",
        description: "Your profile information has been updated",
      });
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-full mx-auto"
      >

        <div className="grid grid-cols-1 sm:gap-6 mt-6 sm:grid-cols-2">
          <FormInput
            register={register}
            errors={errors}
            id="firstname"
            name="First Name"
            placeholder="Enter your first name"
          />
          <FormInput
            register={register}
            errors={errors}
            id="lastname"
            name="Last Name"
            placeholder="Enter your last name"
          />
        </div>

        <FormInput
          register={register}
          errors={errors}
          id="username"
          name="Username"
          placeholder="Enter your username"
        />
        <FormInput
          register={register}
          errors={errors}
          id="email"
          name="Email"
          placeholder="Enter your email"
        />

        <div className="flex justify-between gap-4 mt-4 w-full ">
          <Button
            type="button"
            variant="outline"
            className="border-2  border-stone-700 dark:border-white dark:bg-transparent"
            onClick={() => {
              setOpenChangePassword(true);
            }}
          >
            Change Password
          </Button>
          <Button type="submit" disabled={isSubmitting} className="">
            {isSubmitting ? "updating..." : "Update Profile"}
          </Button>
        </div>

        {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
      </form>
      <FormModal open={openChangePassword} setOpen={setOpenChangePassword}>
        <ChangePassword selfOpenModal={setOpenChangePassword} />
      </FormModal>

      <FormModal open={openForgetPassword} setOpen={setOpenForgetPassword}>
        <Suspense fallback={<div><img src={loading_gif} alt="loading gif" /></div>}>
          <ForgetPassword />
        </Suspense>
      </FormModal>
    </>
  );
}
