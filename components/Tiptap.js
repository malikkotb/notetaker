"use client";

import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { FaListOl, FaListUl, FaUndo, FaRedo, FaCode } from "react-icons/fa";
import { BsEraser } from "react-icons/bs";
import useMyStore from "../app/(store)/store";
import { useEffect, useState } from "react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const MenuBar = ({ activeNote}) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    editor.commands.setContent(`<p>${activeNote.content}</p>`);
    console.log("editor-HTML: ", editor.getHTML());
  }, [activeNote]);

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") ? "is-active" : ""}`}
        >
          B
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          I
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <FaCode />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <BsEraser />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          clear nodes
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaListUl />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </Button>

        <Button
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          purple
        </Button>
      </div>
    </div>
  );
};

const content = ``;

export default ({ activeNote }) => {
  

  return (
    <EditorProvider
      slotBefore={<MenuBar activeNote={activeNote} />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};
