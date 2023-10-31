"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import useMyStore from "../app/(store)/store";
import { Button } from "../components/ui/button";

export default function Sidebar({ sidebarVisible }) {
  const { updateActiveNote, notes, updateNotes, activeNote } = useMyStore();
  const [activeItem, setActiveItem] = useState(null);

  // TODO: add new note to database in store.js
  const addNote = () => {
    console.log("add a new note");

    // update global notes
    updateNotes({ title: "", content: "h" });

    //TODO: sync state of title and sidebar-active note

    // change activeNote to this newly added Note
    updateActiveNote({ title: "", content: "h", index: notes.length });
  };

  const handleClickNote = (note, index) => {
    updateActiveNote({
      title: note.title,
      content: note.content,
      index: index,
    });
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
          <div onClick={addNote} className="cursor-pointer">
            <Plus />
          </div>
        </div>
        <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Notes
        </h3>
        {/* style each title of a note */}
        {notes.map((note, index) => (
          <>
            <Button
              onClick={() => handleClickNote(note, index)}
              className={`w-full justify-start font-normal`}
              variant="ghost"
              key={index}
            >
              {note.title || (activeNote.title === "" ? "Untitled" : activeNote.title)}
            </Button>
          </>
        ))}
      </div>
      <div>Username</div>
    </div>
  );
}
