"use client";
import "./styles.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import useMyStore from "../app/(store)/store";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import pb from "../app/(lib)/pocketbase";
import MenuBar from "./MenuBar";
import useUpdateNote from "@/app/(hooks)/useUpdateNote";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default () => {
  const { mutate: updateNote } = useUpdateNote();
  const { activeNote } = useMyStore();


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
      const title = h1Content ? h1Content[1] : ""

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

  // useEffect(() => {
  //     editor?.commands.setContent(`
  //       <h1>${activeNote.title}</h1>${activeNote.content}`);
  // }, [activeNote, ]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent className="px-4" editor={editor} />
    </div>
  );
};

