import { cn } from "@/lib/utils";

export default function DividerLine({ className }) {
  return (
    <div className={cn("bg-neutral-700 my-6 h-[1px] w-full", className)} />
  );
}
