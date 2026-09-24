import { ChevronLeft, ChevronRight } from "lucide-react";

type ActionMarkProps = {
  compact?: boolean;
  className?: string;
};

export function ActionMark({ compact = false, className = "" }: ActionMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={
        compact
          ? `inline-flex h-6 w-6 shrink-0 items-center justify-center text-base font-medium leading-none transition-transform duration-150 group-hover:-translate-y-px motion-reduce:transform-none motion-reduce:transition-none ${className}`
          : `ml-0.5 inline-flex h-5 min-w-5 shrink-0 items-center justify-center border-l border-current/20 pl-2 text-[0.92rem] font-medium leading-none transition-transform duration-150 group-hover:-translate-y-px motion-reduce:transform-none motion-reduce:transition-none ${className}`
      }
    >
      +
    </span>
  );
}

type DirectionMarkProps = {
  direction: "previous" | "next";
};

export function DirectionMark({ direction }: DirectionMarkProps) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
  return (
    <Icon
      aria-hidden="true"
      className={
        direction === "previous"
          ? "h-4 w-4 transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
          : "h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
      }
      strokeWidth={1.9}
    />
  );
}

type DisclosureMarkProps = {
  expanded: boolean;
};

export function DisclosureMark({ expanded }: DisclosureMarkProps) {
  return (
    <span aria-hidden="true" className="inline-flex h-4 min-w-4 items-center justify-center text-base font-medium leading-none">
      {expanded ? "−" : "+"}
    </span>
  );
}
