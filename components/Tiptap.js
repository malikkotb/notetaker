"use client";
import "./styles.scss";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import useMyStore from "../app/(store)/store";
import { useEffect, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import PocketBase from "pocketbase";
import MenuBar from "./MenuBar";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default () => {
  const [headingValue, setHeadingValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  // TODO: maybe change this to having only one attribute and not separate ones for note and title
  const { activeNote, updateNoteTitle, updateNoteContent, notes } =
    useMyStore();

  // update note title
  useEffect(() => {
    updateNoteTitle(activeNote.index, headingValue);
  }, [headingValue]);

  // update note content
  useEffect(() => {
    updateNoteContent(activeNote.index, contentValue);
  }, [contentValue]);

  useEffect(() => {
    // Set initial content of the h1 tag
    setHeadingValue(activeNote.title);
    setContentValue(activeNote.content);
  }, [activeNote]);

  useEffect(() => {
    // console.log(notes);
    const intervalId = setInterval(() => {
      const updateNotes = async () => {
        try {
          const pb = new PocketBase("http://127.0.0.1:8090");
          // TODO: Add checks to ensure that the note is added only for the logged-in user
          const data = {
            ...notes[activeNote.index],
            title: headingValue,
            content: contentValue,
          };
          const record = await pb
            .collection("notes")
            .update(activeNote.record_id, data);
        } catch (error) {
          console.log("Error: ", error);
        }
      };

      updateNotes();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [contentValue, headingValue]);

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
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Anything else ?";
        },
      }),
    ],
    content: ``,
    onUpdate({ editor }) {
      // Access the HTML content of the h1 tag
      const htmlContent = editor.getHTML();

      const h1Content = htmlContent.match(/<h1>(.*?)<\/h1>/i);
      // Update the state with the content of the h1 tag
      setHeadingValue(h1Content ? h1Content[1] : "");

      // regex to extract content after the </h1> tag
      const match = htmlContent.match(/<\/h1>(.*)/s);
      // Save content after </h1> to content of note
      const contentAfterH1 = match ? match[1] : "";
      setContentValue(contentAfterH1);
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent className="px-4" editor={editor} />
    </div>
  );
};
