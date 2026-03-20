import { cn } from "@/lib/utils";

interface ClientAvatarProps {
  initials: string;
  colorClass: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function ClientAvatar({
  initials,
  colorClass,
  size = "md",
}: ClientAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold shadow-sm shrink-0",
        colorClass,
        sizeClasses[size],
      )}
    >
      {initials}
    </div>
  );
}
