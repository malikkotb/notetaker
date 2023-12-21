import MenuBar from "./MenuBar";

export default function MenuBarWrapper({ editor }) {
    if (!editor) {
      return null;
    }
  
    return <MenuBar editor={editor} />;
  }
  