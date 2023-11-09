"use client"
import "./styles.scss";


import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "@/components/ui/button";
import { FaListOl, FaListUl, FaUndo, FaRedo, FaCode } from "react-icons/fa";
import { BsEraser } from "react-icons/bs";
import useMyStore from "../app/(store)/store";
import { useEffect } from "react";
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const { activeNote } = useMyStore();

  useEffect(() => {
    editor.commands.setContent(`
    <p>${activeNote.content}</p>`);
    console.log("editor-HTML: ", editor.getHTML());
  }, [activeNote]);

  useEffect(() => {
    // Function run every 5 seconds
    const intervalId = setInterval(() => {
      console.log(editor.getHTML());
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Find the first h1 element
    const firstH1 = document.querySelector('h1');
    if (firstH1) {
      // firstH1.set
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount


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
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
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
      </div>
    </div>  )
}

const CustomDocument = Document.extend({
  content: 'heading block*',
})

export default () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Anything else ?'
        },
      }),
      Text,
    ],
    content: ``,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent className="px-4" editor={editor} />
    </div>
  )
}