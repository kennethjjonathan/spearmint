import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, type, id, label, required, ...props }, ref) => {
    return (
      <div className="relative z-0 w-full pt-3 font-satoshi">
        <input
          type={type}
          placeholder=""
          className={cn(
            "peer block w-full appearance-none border-0 border-b-2 border-accent bg-transparent px-0 py-1 text-foreground outline-none ring-0 duration-300 focus:border-white",
            className,
          )}
          required={required}
          id={id}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute -z-10 min-w-full -translate-x-[12.5%] -translate-y-[212.5%] scale-75 p-0 text-accent duration-300 peer-placeholder-shown:min-w-full peer-placeholder-shown:-translate-x-[0%] peer-placeholder-shown:-translate-y-[125%] peer-placeholder-shown:scale-100 peer-focus:min-w-full peer-focus:-translate-x-[12.5%] peer-focus:-translate-y-[212.5%] peer-focus:scale-75 peer-focus:text-foreground",
            className,
          )}
        >
          {`${label}${required ? " *" : ""}`}
        </label>
      </div>
    );
  },
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
