import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva(
  "animate-spin rounded-full",
  {
    variants: {
      variant: {
        primary:
          "text-primary",
      },
      size: {
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

const SpinnerLoader = ({variant, size}: VariantProps<typeof spinnerVariants>) => {
  return (
    <Loader2 className={cn(spinnerVariants({ variant, size }))} strokeWidth={3} absoluteStrokeWidth={true}/>
  )
}

SpinnerLoader.displayName = "SpinnerLoader";

export { SpinnerLoader, spinnerVariants };
