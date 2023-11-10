import { Menu } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";
import { ModeToggle } from "./ModeToggle";


export default function Editor({ toggleSidebar }) {
  const { activeNote, notes} = useMyStore();

  return (
    <div className={`p-4 w-full`}>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <Menu />
          </button>
          {activeNote && (
            <div>{notes[activeNote.index].title === "" ? "Untitled" : notes[activeNote.index].title}</div>
          )}
        </div>
        <div className="">
          <ModeToggle />
        </div>
      </div>
      {activeNote ? (
        <Tiptap />
      ) : (
        <h2 className="items-center mt-32 text-2xl text-center">
          Select a note or create a new one
        </h2>
      )}
    </div>
  );
}
