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
import { useEffect, useState, useRef } from "react";



const MenuBar = () => {
  const { activeNote } = useMyStore();
  const { editor } = useCurrentEditor();

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit.configure({
  //       history: false,
  //     }),
  //     Highlight,
  //     TaskList,
  //     TaskItem,

  //   ],
  // })

  useEffect(() => {
    editor.commands.setContent(`
    <p>${activeNote.content}</p>`);
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

export default () => {
  const { activeNote, updateActiveNote, updateNoteTitle } = useMyStore();

  const handleInputChange = (event) => {
    const newTitle = event.target.value;
    updateActiveNote({ ...activeNote, title: newTitle }); // update activeNote
    updateNoteTitle(activeNote.index, newTitle); 

  };

  
  //TODO: save written content of editor to the notes in the store
  // maybe: somehting to do with contenteditable or useEffect
  // check out what travis media said
  // i think it was sth. like persist data every 5 seconds
  // do this in useEffect

  //TODO: on enter event, that when you click enter you naviagte to 
  // to the editor (getelementbyid or similar)

  return (
    <EditorProvider
      slotBefore={
        <div>
          <MenuBar activeNote={activeNote} />
          <input
            type="text"
            value={activeNote.title}
            onChange={handleInputChange}
            className="text-4xl outline-none font-bold w-full"
            placeholder="Untitled"
          />
        </div>
      }
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};
