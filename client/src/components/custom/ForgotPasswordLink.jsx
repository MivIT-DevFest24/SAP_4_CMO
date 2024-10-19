import { useAuth } from "@/context/AuthContext.jsx";

export default function ForgotPasswordLink({ closeResetPasswordModal }) {
  const { setOpenForgetPassword, setOpenLogin } = useAuth();
  return (
    <div className="flex items-center justify-end mb-8">
      <div
        className="text-xs text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
        onClick={() => {
          closeResetPasswordModal?.(false);
          setOpenLogin(false);
          setOpenForgetPassword(true);
        }}
      >
        Forgot password?
      </div>
    </div>
  );
}
