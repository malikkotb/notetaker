"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import useMyStore from "../app/(store)/store";
import { Button } from "../components/ui/button";

export default function Sidebar({ sidebarVisible, notes }) {
  const { updateActiveNote } = useMyStore();
  const [activeItem, setActiveItem] = useState(null);

  // TODO: add new note function; add to database

  const handleClickNote = (obj, index) => {
    updateActiveNote({ title: obj.title, content: obj.content });
    setActiveItem(index);
  };

  return (
    <div
      className={`w-72 dark:bg-neutral-900 ${
        sidebarVisible ? "flex" : "hidden"
      } p-4 h-screen flex-col justify-between border-r shadow-inner`}
    >
      <div className="flex flex-col">
        <div className="mb-3 p-2 flex justify-between">
          <div className="">Notetaker</div>
          <div
            onClick={() => console.log("add note")}
            className="cursor-pointer"
          >
            <Plus />
          </div>
        </div>
        <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Notes
        </h3>
        {/* style each title of a note */}
        {notes.map((obj, index) => (
          <Button
            onClick={() => handleClickNote(obj, index)}
            className={` w-full justify-start font-normal`}
            variant="ghost"
            key={index}
          >
            {obj.title}
          </Button>
        ))}
      </div>
      <div>Username</div>
    </div>
  );
}
