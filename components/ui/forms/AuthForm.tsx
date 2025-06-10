"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  Path,
} from "react-hook-form";
import { z } from "zod";
import ROUTES from "@/constants/routes";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface AuthFormProps<T extends FieldValues> {
  formType: "SIGN_IN" | "SIGN_UP";
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

const AuthForm = <T extends FieldValues>({
  formType,
  schema,
  defaultValues,
  // onSubmit,
}: AuthFormProps<T>) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async () => {};

  const identify = formType === "SIGN_IN" ? "Sign In" : "Sign Up";
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-8"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "Password" : "text"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full mt-4 h-12 bg-black text-white dark:bg-white dark:text-black"
          type="submit"
        >
          {form.formState.isSubmitting
            ? identify === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : identify}
        </Button>
        {formType === "SIGN_IN" ? (
          <p>
            Don&#39;t have an Account? {""}
            <Link className="text-amber-500" href={ROUTES.SIGN_UP}>
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href={ROUTES.SIGN_IN} className="text-amber-500">
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};
export default AuthForm;
