"use client";
import { Button } from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import { InputWithLabel } from "@/components/InputWithLabel";
import { handleError } from "@/lib/handleError";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApiError } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9]{3,}$/gi,
      "Username must be 3 alphanumeric characters minimum without special characters",
    ),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters",
    ),
});

const SignUpPage = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (formData: z.infer<typeof signUpSchema>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setIsEmailSent(true);
    } catch (error: unknown) {
      if (error instanceof AuthApiError) handleError(error.message);
    }
  };
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center space-y-5">
      <div className="w-full space-y-5">
        <h1 className="text-center font-cabinet text-3xl font-bold lg:text-4xl">
          Sign Up
        </h1>
        {!isEmailSent && (
          <p className="text-center text-accent lg:text-lg">
            Alreeady have an account?{" "}
            <Link
              href={"/signin"}
              className="border-0 border-b-2 border-accent pb-1 text-foreground duration-300 hover:border-foreground"
            >
              Sign In
            </Link>
          </p>
        )}
      </div>
      {!isEmailSent ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg space-y-3 lg:space-y-5"
        >
          <InputWithLabel
            {...register("username")}
            label="Username"
            type="text"
            className="lg:text-lg"
            id="signup-username"
            isError={errors.username}
            errorMessage={errors.username?.message}
            disabled={isSubmitting}
          />
          <InputWithLabel
            {...register("email")}
            label="Email"
            type="email"
            className="lg:text-lg"
            id="signup-email"
            isError={errors.email}
            errorMessage={errors.email?.message}
            disabled={isSubmitting}
          />
          <InputPassword
            {...register("password")}
            label="Password"
            id="password"
            idForShowPassword="signup-password"
            className="lg:text-lg"
            isError={errors.password}
            errorMessage={errors.password?.message}
            disabled={isSubmitting}
          />
          <div className="pt-3">
            <Button
              isLoading={isSubmitting}
              className="w-full"
              type="submit"
              size={"lg"}
            >
              Sign Up
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-sm lg:text-base">
          <p className="font-semibold">Check your email.</p>
          <p>
            We&apos;ve sent you an email, please confirm your account to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
