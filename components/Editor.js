import { Menu } from "lucide-react";
import Tiptap from "./Tiptap";
import useMyStore from "@/app/(store)/store";
import { ModeToggle } from "./ModeToggle";


export default function Editor({ toggleSidebar }) {

  const {activeNote} = useMyStore();

  // async function getNotes() {
  //   const pb = new PocketBase("http://127.0.0.1:8090");
  //   const data = await pb.collection("notes").getList(1, 50);
  //   return data;
  // }


  return (
    <div className={` p-4 w-full`}>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <Menu />
          </button>
          {activeNote && <div>{activeNote.title === "" ? "Untitled" : activeNote.title}</div>}
        </div>
        <div className="">
          <ModeToggle />
        </div>
      </div>
      {activeNote ? <Tiptap /> : <h2 className="items-center mt-32 text-2xl text-center">Select a note or create a new one</h2>}
    </div>
  );
}
