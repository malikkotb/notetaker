"use client";
import "./styles.scss";
import { EditorContent, useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import pb from "../app/(lib)/pocketbase";
import MenuBarWrapper from "./MenuBarWrapper";
import useUpdateNote from "../app/(hooks)/useUpdateNote";
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
// load all highlight.js languages

// import { lowlight } from "lowlight/lib/core";
import {common, createLowlight} from 'lowlight'
const lowlight = createLowlight(common)


import CodeBlockComponent from "./syntaxHighlight/CodeBlockComponent";
// lowlight.registerLanguage("html", html);
// lowlight.registerLanguage("css", css);
// lowlight.registerLanguage("js", js);
// lowlight.registerLanguage("ts", ts);


const CustomDocument = Document.extend({
  content: "heading block*",
});

export default function TipTap() {
  const { mutate: updateNote } = useUpdateNote();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }
          return "Anything else ?";
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: ``,
    onUpdate({ editor }) {
      // Access the HTML content of the h1 tag
      const htmlContent = editor.getHTML();

      const h1Content = htmlContent.match(/<h1>(.*?)<\/h1>/i);
      const title = h1Content ? h1Content[1] : "";

      const match = htmlContent.match(/<\/h1>(.*)/s); // regex to extract content after the </h1> tag
      const contentAfterH1 = match ? match[1] : "";

      const data = {
        userId: pb.authStore.model.id,
        title: title,
        content: contentAfterH1,
      };
      updateNote(data);
    },
  });

  return (
    <div>
      <MenuBarWrapper editor={editor} />
      <EditorContent className="px-2 sm:px-4 max-h-[75vh] sm:max-h-[75vh] editorContent overflow-y-auto" editor={editor} />
    </div>
  );
};
