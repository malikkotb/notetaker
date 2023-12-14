import { Menu } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";
import { ModeToggle } from "./ModeToggle";
import { ChevronLeft } from "lucide-react";


export default function Editor({ toggleSidebar, sidebarVisible }) {
  const { activeNote, activeCategory } = useMyStore();

  return (
    <>
      <div className={`p-4 ${!sidebarVisible ? "pl-0" : ""} w-full bg-customWhite text-customBlack dark:text-customWhite dark:bg-customBlack`}>
        <div className="flex items-center justify-between">
          <div className="flex px-2 gap-2">
            <button className={`cursor-pointer ${!activeCategory ? "opacity-0" : ""}`} disabled={!activeCategory} onClick={toggleSidebar}>
            <ChevronLeft className="sm:hidden" /><Menu className="hidden sm:block" />
            </button>
            {/* {activeNote ? notes[activeNote.index].title : ""} */}
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