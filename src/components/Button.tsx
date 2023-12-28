import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { SpinnerLoader } from "./SpinnerLoader";

const buttonVariants = cva(
  "duration-300 flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden border z-0 relative rounded-lg before:absolute before:w-full before:left-0 before:h-full before:-z-10 before:rounded-lg before:top-full before:duration-300 enabled:lg:hover:before:top-0 enabled:active:before:top-0",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-primary enabled:lg:hover:text-foreground before:bg-primary border-foreground enabled:active:text-foreground",
      },
      size: {
        lg: "text-lg py-1 px-2 lg:text-xl",
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
    VariantProps<typeof buttonVariants> {
      isLoading?: boolean
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? <SpinnerLoader size={size} variant={variant}/> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, VariantProps };
