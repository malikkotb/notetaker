import { Button } from "../components/ui/button";
import { FaListOl, FaListUl, FaUndo, FaRedo, FaCode } from "react-icons/fa";
import { BsEraser } from "react-icons/bs";
import useMyStore from "../app/(store)/store";
import { useEffect } from "react";

export default function MenuBar({ editor }) {
    if (!editor) {
      return null;
    }
  
    const { activeNote } = useMyStore();
  
    useEffect(() => {
      if (editor) {
        editor.commands.setContent(`
          <h1>${activeNote.title}</h1>${activeNote.content}`);
      }
    }, [activeNote]);
  
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
            className={editor.isActive("codeBlock") ? "is-active" : ""}
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
      </div>
    );
  };