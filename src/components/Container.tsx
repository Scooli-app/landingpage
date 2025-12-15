import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-6xl px-6 md:max-w-7xl md:px-12",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

