"use client";
import { Button } from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import { InputWithLabel } from "@/components/InputWithLabel";
import useToast from "@/hooks/useToast";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApiError } from '@supabase/supabase-js';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const SignInPage = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema)})

  const onSubmit = async (formData: z.infer<typeof signInSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if (error) throw error
    } catch (error: unknown) {
      if (error instanceof AuthApiError) useToast(error.message)
    }
  }

  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center space-y-5">
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-3 lg:space-y-5">
        <InputWithLabel
          {...register("email")}
          label="Email"
          type="email"
          className="lg:text-lg"
          id="signin-email"
        />
        <InputPassword
          {...register("password")}
          label="Password"
          id="password"
          idForShowPassword="signin-password"
          className="lg:text-lg"
        />
        <div className="pt-3">
          <Button className="w-full" type="submit" size={"lg"}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
