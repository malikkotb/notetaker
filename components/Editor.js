import { Menu, Moon } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";

export default function Editor({ toggleSidebar }) {

  const {activeNote} = useMyStore();

  return (
    <div className={`bg-white p-4`}>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <Menu />
          </button>
          <div>{activeNote.title}</div>
        </div>
        <div className="">
          <Moon />
        </div>
      </div>
      <Tiptap activeNote={activeNote} />
    </div>
  );
}
