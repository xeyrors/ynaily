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
        "px-2 py-0.5 text-[11px] transition-colors rounded-full",
        active
          ? "bg-[#6366f1]/15 text-[#818cf8]"
          : "text-[#52525b] hover:text-[#a1a1aa]",
        className
      )}
    >
      {label}
    </button>
  );
}
