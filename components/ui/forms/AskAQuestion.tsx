"use client";
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "../form";
import { Input } from "../input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AskQuestionSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Button } from "../button";

const AskAQuestion = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleCreateQuestion = (data: any) => {
    // Handle form submission logic here
    console.log(form.getValues());
  };
  return (
    <div className="flex flex-col justify-center pt-15 gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateQuestion)}
          className="mt-10 space-y-8"
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 pb-5">
                  Question Title
                  <span className="text-amber-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    className="w-full min-h-[55px] focus:outline-none border"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide a clear and concise title for your question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateQuestion)}
          className="mt-10 space-y-8"
        >
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 pb-5">
                  Detailed explanation of your problem?
                  <span className="text-amber-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    className="w-full min-h-[190px] focus:outline-none border"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide a detailed explanation of your problem or question.
                  This will help others understand and provide better answers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateQuestion)}
          className="mt-10 space-y-8"
        >
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 pb-5">Question Title
                  <span className="text-amber-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    className="w-full min-h-[55px] focus:outline-none border"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide relevant tags for your question. This will help categorize it and make it easier for others to find.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button 
      type="submit" className="w-full mt-5 hover:bg-amber-500">Ask Question</Button>
    </div>
  );
};

export default AskAQuestion;
