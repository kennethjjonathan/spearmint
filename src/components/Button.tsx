import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "duration-300 border-0 z-0 rounded-lg relative before:absolute before:w-full before:h-full before:-z-10 before:translate-y-full before:rounded-lg before:duration-300 hover:before:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-primary hover:text-foreground before:bg-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, VariantProps };
