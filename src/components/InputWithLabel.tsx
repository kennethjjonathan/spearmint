import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, type, id, label, required, ...props }, ref) => {
    return (
      <div className="relative pt-3.5">
        <input
          type={type}
          className={cn(
            "peer block w-full appearance-none border-0 border-b-2 border-accent bg-transparent px-0 py-1 text-foreground outline-none ring-0 duration-300 focus:border-white font-satoshi",
            className,
          )}
          id={id}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute -translate-x-2 -translate-y-12 scale-75 text-accent duration-300 peer-placeholder-shown:-translate-y-7 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100 peer-focus:-translate-x-2 peer-focus:-translate-y-12 peer-focus:scale-75 peer-focus:text-foreground font-satoshi",
            className,
          )}
        >
          {`${label}${required ? " *": ""}`}
        </label>
      </div>
    );
  },
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
