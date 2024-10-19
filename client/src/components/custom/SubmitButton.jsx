import BottomGradient from "@/components/custom/BottomGradient.jsx";

export default function SubmitButton({
  isSubmitting,
  text,
  loading,
  className,
}) {
  return (
    <button
      className={`bg-black dark:bg-white relative group/btn text-white dark:text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]
      ${isSubmitting ? "cursor-not-allowed bg-opacity-60" : "cursor-pointer"}
      ${className ? className : "w-full"}
      `}
      type="submit"
    >
      {isSubmitting ? loading : text}
      <BottomGradient />
    </button>
  );
}
