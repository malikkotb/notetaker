import { Button } from "../components/ui/button";
import { FaListOl, FaListUl, FaUndo, FaRedo, FaCode } from "react-icons/fa";
import { BsEraser } from "react-icons/bs";
import useMyStore from "../app/(store)/store";
import { useEffect } from "react";

export default function MenuBar({ editor }) {
  
  const { activeNote } = useMyStore();

  // https://github.com/ueberdosis/tiptap/issues/3764
  useEffect(() => {
    setTimeout(() => {
      editor?.commands.setContent(`
            <h1>${activeNote.title}</h1>${activeNote.content}`);
    });
  }, [activeNote]);

  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className={`hover:bg-zinc-200 ${
            editor?.isActive("bold") ? "is-active" : ""
          }`}
        >
          B
        </Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className={`hover:bg-zinc-200 ${
            editor?.isActive("italic") ? "is-active" : ""
          }`}
        >
          I
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor?.can().chain().focus().toggleCode().run()}
          className={`hover:bg-zinc-200 ${
            editor?.isActive("code") ? "is-active" : ""
          }`}
        >
          <FaCode />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="hover:bg-zinc-200"
        >
          <BsEraser />
        </Button>
        {/* <Button
          variant="outline"
          onClick={() => editor?.chain().focus().clearNodes().run()}
          className="hover:bg-zinc-200"
        >
          clear nodes
        </Button> */}
        <Button
        variant="outline"
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
          className={`hover:bg-zinc-200 ${editor.isActive("taskList") ? "is-active" : ""}`}
        >
          task
        </Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`hover:bg-zinc-200 ${
            editor?.isActive("bulletList") ? "is-active" : ""
          }`}
        >
          <FaListUl />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`hover:bg-zinc-200 ${
            editor?.isActive("orderedList") ? "is-active" : ""
          }`}
        >
          <FaListOl />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`hover:bg-zinc-200 ${
            editor?.isActive("codeBlock") ? "is-active" : ""
          }`}
        >
          code block
        </Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          className="hover:bg-zinc-200"
        >
          <FaUndo />
        </Button>
        <Button
          variant="outline"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          className="hover:bg-zinc-200"
        >
          <FaRedo />
        </Button>
      </div>
    </div>
  );
}
