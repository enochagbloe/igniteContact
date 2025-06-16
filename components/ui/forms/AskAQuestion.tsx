"use client";
import React, { useRef } from "react";
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
import dynamic from "next/dynamic";
import { z } from "zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import TagCards from "@/components/cards/TagCards";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const AskAQuestion = () => {
  const Ref = useRef<MDXEditorMethods>(null);

  // Specify the question form validation
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    // what happens when the user presses enter
    if (e.key === "Enter") {
      e.preventDefault();
      const inputTag = e.currentTarget.value.trim();

      if (
        inputTag &&
        !field.value.includes(inputTag) &&
        inputTag.length <= 30
      ) {
        form.setValue("tags", [...field.value, inputTag]);
        form.clearErrors("tags");
        e.currentTarget.value = "";
      } else if (inputTag.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag must be at least 15 characters",
        });
        // check if the tag already exist
      } else if (field.value.includes(inputTag)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exist",
        });
      }
      e.currentTarget.value = "";
      console.log("tags", field.value);
    }
  };

  const handleRemoveTag = (tag: string, field: { value: string[] }) => {
    const removeTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", removeTags); // update the form value to remove the tag from the form control
  };
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
          {/* Title Field */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 pb-5">
                  Question Title <span className="text-amber-500">*</span>
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

          {/* Content Field */}
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 pb-5 dark:text-white">
                  Detailed explanation of your problem?{" "}
                  <span className="text-amber-500">*</span>
                </FormLabel>
                <FormControl>
                  <Editor
                    editorRef={Ref}
                    value={field.value}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Please provide a detailed explanation of your problem or
                  question. This will help others understand and provide better
                  answers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Field */}
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 pb-5">
                  Tags <span className="text-amber-500">*</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="text"
                      className="w-full min-h-[55px] focus:outline-none border"
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />
                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 dark:text-white">
                        {field.value.map((tag: string) => (
                          <TagCards
                            _id={tag}
                            name={tag}
                            key={tag}
                            compact
                            question={0}
                            isButton
                            remove
                            handleRemoveTag={() => handleRemoveTag(tag, field)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Please provide relevant tags for your question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-5 hover:bg-amber-500">
            Ask Question
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskAQuestion;
