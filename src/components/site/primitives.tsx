import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Building blocks of the site's design system. They are deliberately plain:
 * hierarchy comes from type and spacing, and the only colour is in actions.
 */

export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.06em] text-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}

export const displayTitle =
  "font-display font-medium tracking-[-0.025em] text-ink [&_em]:italic";

export function SectionHeader({
  id,
  kicker,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: {
  /** Put on the heading, for the section's `aria-labelledby`. */
  id?: string;
  kicker?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "mb-12 max-w-[720px] md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && <Kicker>{kicker}</Kicker>}
      <Heading
        id={id}
        className={cn(
          displayTitle,
          "mt-3 text-[clamp(34px,4vw,50px)] leading-[1.08]",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-subtle">{description}</p>
      )}
    </div>
  );
}

export function Section({
  id,
  tone = "canvas",
  bordered = false,
  className,
  containerClassName,
  children,
  "aria-labelledby": ariaLabelledBy,
}: {
  id?: string;
  tone?: "canvas" | "stone";
  /** Hairline on top, for consecutive white sections. */
  bordered?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "scroll-mt-20 py-[88px] md:py-32",
        tone === "stone" ? "bg-stone" : "bg-canvas",
        bordered && "border-t border-line",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** A screenshot or video of the app, framed like a minimal browser window. */
export function WindowFrame({
  url,
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line-strong bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_30px_70px_-36px_rgba(17,17,17,0.18)]",
        className,
      )}
    >
      <div className="flex h-[34px] items-center gap-[7px] border-b border-line bg-[#FBFBFA] px-3.5">
        <span className="size-2.5 rounded-full bg-[#E3E2DE]" />
        <span className="size-2.5 rounded-full bg-[#E3E2DE]" />
        <span className="size-2.5 rounded-full bg-[#E3E2DE]" />
        {url && (
          <span className="ml-3 truncate font-mono text-xs text-faint">{url}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn("rounded-xl border border-line-strong bg-white", className)}
      {...props}
    >
      {children}
    </div>
  );
}

const tagTones = {
  violet: "bg-violet-wash text-violet-ink",
  green: "bg-tag-green text-tag-green-ink",
  blue: "bg-tag-blue text-tag-blue-ink",
  yellow: "bg-tag-yellow text-tag-yellow-ink",
  red: "bg-tag-red text-tag-red-ink",
} as const;

export function Tag({
  tone = "violet",
  className,
  children,
}: {
  tone?: keyof typeof tagTones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2 py-1 text-[10.5px] font-semibold uppercase leading-none tracking-[0.07em]",
        tagTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Columns separated by hairlines instead of boxes: used where a row of short
 * statements would otherwise become a row of cards.
 */
export function DividerGrid({
  columns = 3,
  onStone = false,
  className,
  children,
}: {
  columns?: 2 | 3 | 4;
  onStone?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid border-t",
        onStone ? "border-line-strong" : "border-line",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        "[&>*]:py-6 md:[&>*]:pb-0 md:[&>*]:pt-7 md:[&>*]:pr-7",
        "max-md:[&>*+*]:border-t md:[&>*+*]:border-l md:[&>*+*]:pl-7",
        onStone ? "[&>*+*]:border-line-strong" : "[&>*+*]:border-line",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DividerItem({
  label,
  title,
  children,
  className,
}: {
  label?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal className={className}>
      {label && <span className="font-mono text-xs text-faint">{label}</span>}
      <h3 className={cn("text-[17px] font-semibold leading-snug", label && "mt-1")}>
        {title}
      </h3>
      {children && <p className="mt-2 text-[15px] leading-relaxed text-subtle">{children}</p>}
    </div>
  );
}

/** Dot-led list with hairline separators, used inside panels and cards. */
export function LineList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 border-b border-line py-3 text-[15.5px] leading-relaxed text-body"
        >
          <span aria-hidden className="mt-[11px] size-[5px] shrink-0 rounded-full bg-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
