import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--scooli-primary)] !text-white shadow-sm hover:bg-[color:var(--scooli-primary-strong)] !no-underline",
        destructive:
          "bg-[color:var(--scooli-error)] !text-white shadow-sm hover:bg-[color:var(--scooli-error)]/90 !no-underline",
        outline:
          "border border-[color:var(--scooli-border)] bg-white !text-[color:var(--scooli-ink)] shadow-sm hover:bg-[color:var(--scooli-accent)] !no-underline",
        secondary:
          "bg-[color:var(--scooli-accent)] !text-[color:var(--scooli-ink)] shadow-sm hover:bg-[color:var(--scooli-accent)]/80 !no-underline",
        ghost:
          "!text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)] !no-underline",
        link: "!text-[color:var(--scooli-primary)] hover:!text-[color:var(--scooli-primary-strong)] !no-underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
