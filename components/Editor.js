import { Menu } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";
import { ModeToggle } from "./ModeToggle";

export default function Editor({ toggleSidebar }) {

  const {activeNote} = useMyStore();

  return (
    <div className={` p-4 w-full`}>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <Menu />
          </button>
          <div>{activeNote.title}</div>
        </div>
        <div className="">
          <ModeToggle />
        </div>
      </div>
      <Tiptap activeNote={activeNote} />
    </div>
  );
}
