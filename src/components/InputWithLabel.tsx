import { cn } from "@/lib/utils";
import * as React from "react";
import { FieldError } from "react-hook-form";

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: FieldError | undefined;
  errorMessage?: string | undefined;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      className,
      type,
      id,
      label,
      required,
      isError = false,
      errorMessage = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative z-0 w-full pt-3">
          <input
            type={type}
            placeholder=""
            className={cn(
              "peer block w-full appearance-none border-0 border-b-2 border-accent bg-transparent px-0 py-1 text-foreground outline-none ring-0 duration-300 focus:border-foreground",
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
        {isError && (
          <p className="text-destructive w-full max-w-full text-left text-xs lg:text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
