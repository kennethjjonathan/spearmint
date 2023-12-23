"use client";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { InputWithLabel, InputWithLabelProps } from "./InputWithLabel";

export interface InputPasswordProps extends InputWithLabelProps {
  idForShowPassword: string;
}
const InputPassword = ({
  label,
  idForShowPassword,
  ...props
}: InputPasswordProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  function handleChange() {
    setIsShown((prev) => !prev)
  }
  return (
    <div className="flex flex-col items-start gap-2 font-satoshi">
      <InputWithLabel
        label={label}
        type={isShown ? "text" : "password"}
        {...props}
      />
      <div className="flex items-center space-x-2">
        <Checkbox checked={isShown} id={idForShowPassword} onCheckedChange={handleChange}/>
        <label
          htmlFor={idForShowPassword}
          className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-base"
        >
          show password
        </label>
      </div>
    </div>
  );
};

export default InputPassword;
