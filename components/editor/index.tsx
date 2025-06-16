"use client";
// InitializedMDXEditor.tsx
import React from "react";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  imagePlugin,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
// import {basicDark} from "cm6-theme-basic-dark"
import "./dark-editor.css";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";

// Only import this to the next file

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  // Extend MDXEditorProps to include any additional props you need
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}
const Editor = ({ editorRef, value, fieldChange, ...props }: Props) => {
  // define the theme for cm6-theme-basic-dark
  const { resolvedTheme } = useTheme();
  // const theme = resolvedTheme === "dark" ? [basicDark] : [];
  return (
    <MDXEditor
      className="border markdown-editor w-full dark:text-white"
      key={resolvedTheme}
      markdown={value}
      onChange={fieldChange}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        tablePlugin(),
        linkDialogPlugin(),
        thematicBreakPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(),
        toolbarPlugin({
          // toolbarClassName: resolvedTheme === "dark" ? "dark-toolbar" : "",
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "markdown",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />
                    </>
                  ),
                },
              ]}
            ></ConditionalContents>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};

export default Editor;
