import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "duration-300 overflow-hidden border z-0 relative rounded-lg before:absolute before:w-full before:left-0 before:h-full before:-z-10 before:rounded-lg before:top-full before:duration-300 lg:hover:before:top-0 active:before:top-0 font-satoshi",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-primary lg:hover:text-foreground before:bg-primary border-foreground",
      },
      size: {
        lg: "text-lg py-1 px-2 lg:text-xl"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, VariantProps };
