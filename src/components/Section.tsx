import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  as?: "section" | "div";
} & HTMLAttributes<HTMLElement>;

export function Section({
  id,
  children,
  className,
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("py-12 md:py-20", className)}
      aria-label={id ? id.replace("-", " ") : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

