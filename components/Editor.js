import { Menu } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";
import { ModeToggle } from "./ModeToggle";

export default function Editor({ toggleSidebar, notes }) {
  const { activeNote, activeCategory } = useMyStore();

  return (
    <>
      <div className={`p-4 w-full`}>
        <div className="flex items-center justify-between">
          <div className="flex px-4 gap-2">
            <button className="cursor-pointer" disabled={!activeCategory} onClick={toggleSidebar}>
              <Menu />
            </button>
            {activeNote ? notes[activeNote.index].title : ""}
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
        {activeNote ? (
          <Tiptap />
        ) : (
          <h2 className="items-center mt-32 text-2xl text-center">
            Select a category and then select a note or create a new one
          </h2>
        )}
      </div>
    </>
  );
}
