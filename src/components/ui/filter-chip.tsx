import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterChip({ label, active, onClick, className }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-[#6366f1] text-white"
          : "border border-[#27272a] bg-transparent text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#f1f1f1]",
        className
      )}
    >
      {label}
    </button>
  );
}
