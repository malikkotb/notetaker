import { Menu } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";
import { ModeToggle } from "./ModeToggle";
import { ChevronLeft } from "lucide-react";
import useWindowWidth from "../app/(hooks)/useWindowWidth";

export default function Editor({ toggleSidebar, sidebarVisible }) {
  const { activeNote, activeCategory, showEditor, setShowEditor } =
    useMyStore();

  function handleClick() {
    if (width <= 768) {
      // flip it back
      // toggleSidebar();
      setShowEditor();
    }
    toggleSidebar()
  }
  const width = useWindowWidth();

  function showEditorOrNot() {
    if (width <= 768) {
      console.log("showEditor inside showeditorOrnot", showEditor);
      if (!showEditor) {
        return "hidden"; // if showEditor is false
      } else {
        return "block h-screen";
      }
    }
  }

  // originally showEditor should be false on mobile screens and true on larger screens

  return (
    <>
      <div className={`${showEditorOrNot()} w-full`}>
        <div
          className={`p-4 ${
            !sidebarVisible ? "pl-0" : ""
          } pl-4 h-screen w-full bg-customWhite text-customBlack dark:text-customWhite dark:bg-customBlack`}
        >
          <div className="flex items-center justify-between">
            <div className="flex px-2 gap-2">
              <button
                className={`cursor-pointer ${
                  !activeCategory ? "opacity-0" : ""
                }`}
                disabled={!activeCategory}
                onClick={handleClick}
              >
                <ChevronLeft className="sm:hidden" />
                <Menu className="hidden sm:block" />
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
      </div>
    </>
  );
}
