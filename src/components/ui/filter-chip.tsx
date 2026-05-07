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
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground/50 hover:text-muted-foreground",
        className
      )}
    >
      {label}
    </button>
  );
}
