import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Violet is reserved for actions: `primary` is the one filled button per
 * view, `secondary` the quiet alternative next to it. `default` and `outline`
 * are the shadcn names other ui/ primitives still use, so they alias the two.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium !no-underline transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-violet !text-white hover:bg-violet-ink",
        default: "bg-violet !text-white hover:bg-violet-ink",
        secondary:
          "border border-[#DEDDD9] bg-white !text-ink hover:border-[#C9C8C3] hover:bg-stone-soft",
        outline:
          "border border-[#DEDDD9] bg-white !text-ink hover:border-[#C9C8C3] hover:bg-stone-soft",
        ghost: "!text-ink hover:bg-stone-soft",
        link: "h-auto px-0 !text-violet-ink underline-offset-4 hover:!underline",
        destructive: "bg-tag-red-ink !text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-3.5 text-[13.5px]",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-10",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: {
      variant: "primary",
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
    asChild?: boolean;
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
