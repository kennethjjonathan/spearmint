"use client"
import { Button } from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import { InputWithLabel } from "@/components/InputWithLabel";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="container flex h-screen flex-col items-center justify-center space-y-5 w-full">
      <div className="w-full space-y-5">
        <h1 className="text-center text-3xl font-bold lg:text-4xl">Sign In</h1>
        <p className="text-center font-satoshi text-accent lg:text-lg">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="border-0 border-b-2 border-accent pb-1 text-foreground duration-300 hover:border-foreground"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <form className="w-full space-y-3 max-w-lg lg:space-y-5" onSubmit={(e) => e.preventDefault()}>
        <InputWithLabel label="Email" type="email" required className="lg:text-lg"/>
        <InputPassword label="Password" idForShowPassword="signin-password" required className="lg:text-lg"/>
        <div className="pt-3">
          <Button className="w-full" type="submit" size={"lg"}>Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
