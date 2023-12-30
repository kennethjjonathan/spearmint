"use client";
import * as React from "react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { InputWithLabel, InputWithLabelProps } from "./InputWithLabel";

export type InputPasswordProps = InputWithLabelProps & {
  idForShowPassword: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({label, idForShowPassword, ...props}, ref) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    function handleChange() {
      setIsShown((prev) => !prev);
    }
    return (
      <div className="flex flex-col items-start gap-2">
        <InputWithLabel
          label={label}
          type={isShown ? "text" : "password"}
          ref={ref}
          {...props}
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={isShown}
            id={idForShowPassword}
            onCheckedChange={handleChange}
          />
          <label
            htmlFor={idForShowPassword}
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-base"
          >
            show password
          </label>
        </div>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword"

export default InputPassword;
