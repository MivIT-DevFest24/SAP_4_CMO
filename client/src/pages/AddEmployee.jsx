import FormInput from "@/components/custom/FormInput.jsx";
import ErrorMessage from "@/components/custom/ErrorMessage.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button.jsx";
import { useCreateUserMutation } from "@/hooks/react-query/useAuth";
import ProductSelector from "@/components/dashboard/ProductSelector";
import MultiSelect from "@/components/dashboard/MultiSelect";
import PasswordInput from "@/components/custom/PasswordInput";
import { useToast } from "@/hooks/use-toast";

const ProfilInfoFormSchema = z.object({
  firstname: z.string().min(2, "please enter a valid name").max(50),
  lastname: z.string().min(2, "please enter a valid name").max(50),
  username: z.string().min(2, "please enter a valid username").max(50),
  email: z.string().email("please enter a valid email"),
  // role should be a select field with options like admin, user, etc
  role: z.string().min(1, "please select a role"),
  // shifts should be a select field with options like IT, HR, etc (can take multiple values)
  shifts: z.array(z.string()).min(1, "please select a shifts"),
  password: z
    .string()
    .min(8, "password should be at least 8 characters")
    .max(50),
  // confirmpassword should match the password field
  confirmpassword: z
    .string()
    .min(8, "password should be at least 8 characters"),
});

export default function AddEmployee() {
  const { toast } = useToast();
  const createUserMutation = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      role: "",
      shifts: "",
      password: "",
      confirmpassword: "",
    },
    resolver: zodResolver(ProfilInfoFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      // check if the password and confirmpassword fields match
      if (data.password !== data.confirmpassword) {
        setError("confirmpassword", {
          type: "manual",
          message: "passwords do not match",
        });
        return;
      }

      const response = await createUserMutation.mutateAsync(data);
      if (response) {
        toast({
          variant: "success",
          title: "User created successfully",
        });
      }
      // clear the form after submission
      setValue("firstname", "");
      setValue("lastname", "");
      setValue("username", "");
      setValue("email", "");
      setValue("role", "");
      setValue("shifts", "");
      setValue("password", "");
      setValue("confirmpassword", "");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setError("root", {
        type: "manual",
        message: error,
      });
    }
  };

  const roleNames = ["manager", "operator"];
  const shiftNames = [
    "assembling engines",
    "welding frames",
    "painting bodies",
  ];

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
            placeholder="Enter the first name"
          />
          <FormInput
            register={register}
            errors={errors}
            id="lastname"
            name="Last Name"
            placeholder="Enter the last name"
          />
        </div>

        <FormInput
          register={register}
          errors={errors}
          id="username"
          name="Username"
          placeholder="Enter the username"
        />
        <FormInput
          register={register}
          errors={errors}
          id="email"
          name="Email"
          placeholder="Enter the email"
        />
        <div className="grid grid-cols-1 sm:gap-6 mt-6 sm:grid-cols-2">
          <ProductSelector
            topic="Role"
            items={roleNames}
            value={getValues("role")}
            setValue={setValue}
            errors={errors}
            id="role"
          />
          <MultiSelect
            topic={"Shift"}
            items={shiftNames}
            value={getValues("shifts")}
            onChange={(value) => setValue("shifts", value)}
            errors={errors}
            id="shifts"
          />
        </div>

        <div className="grid grid-cols-1 sm:gap-6 mt-6 sm:grid-cols-2">
          {/* <FormInput
            register={register}
            errors={errors}
            id="password"
            name="Password"
            placeholder="Enter the password"
          /> */}
          <PasswordInput
            register={register}
            errors={errors}
            className="w-full"
            params=""
          />
          <PasswordInput
            register={register}
            errors={errors}
            className="w-full"
            params="confirm"
          />
          {/* <FormInput
            register={register}
            errors={errors}
            id="confirmpassword"
            name="Confirm Password"
            placeholder="Confirm the password"
          /> */}
        </div>

        <div className="flex justify-end gap-4 mt-4 w-full ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 hover:bg-orange-700"
          >
            {isSubmitting ? "creating..." : "Create User"}
          </Button>
        </div>

        {errors.root && <ErrorMessage message={errors.root?.message} />}
      </form>
    </>
  );
}
