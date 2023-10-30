"use client";
import { Plus } from "lucide-react";
import useMyStore from "../app/(store)/store";

export default function Sidebar({ sidebarVisible, notes }) {
  const { updateActiveNote } = useMyStore();

  // TODO: add new note function; add to database

  return (
    <div
      className={`w-72 bg-gray-100 ${
        sidebarVisible ? "flex" : "hidden"
      } p-4 h-screen flex-col justify-between shadow-inner`}
    >
      <div className="flex flex-col">
        <div className="mb-3 p-2 flex justify-between">
          <div className="">Notetaker</div>
          <div onClick={() => console.log("add note")} className="cursor-pointer"><Plus /></div>
        </div>
        {/* style each title of a note */}
        {notes.map((obj, index) => (
          <div
            onClick={() =>
              updateActiveNote({ title: obj.title, content: obj.content })
            }
            className=" active:bg-slate-400 w-full bg-red-300 p-2 border"
            key={index}
          >
            <p className="">{obj.title}</p>
          </div>
        ))}
      </div>
      <div>Username</div>
    </div>
  );
}
