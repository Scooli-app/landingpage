import * as React from "react";

import { cn } from "@/lib/utils";

/** Shared field styling for inputs, textareas and selects in the site's forms. */
export const fieldClass =
  "w-full min-w-0 rounded-md border border-line-strong bg-white px-3.5 text-[15px] text-ink transition-colors outline-none placeholder:text-faint focus:border-violet focus:ring-2 focus:ring-violet/15 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-tag-red-ink";

export const textareaClass = cn(fieldClass, "min-h-[140px] py-2.5 leading-relaxed");

export const labelClass = "text-sm font-medium text-ink";

export const hintClass = "text-[13px] text-subtle";

export const errorClass = "text-sm text-tag-red-ink";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClass, "h-11", className)}
      {...props}
    />
  );
}

export { Input };
