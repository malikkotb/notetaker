"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useMyStore from "../app/(store)/store";
import { Button } from "../components/ui/button";
import pb from "../app/(lib)/pocketbase"
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import Link from "next/link";

export default function Sidebar({ sidebarVisible, loading, setLoading }) {
  const { updateActiveNote, notes, fetchNotes } = useMyStore();
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (loading === false) {
      console.log("update activeNote");
      const note = notes[notes.length - 1];
      updateActiveNote({
        title: note.title,
        content: note.content,
        index: notes.length - 1,
        record_id: note.id,
      });
    }
  }, [notes.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchNotes();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setContentReady(true);
      }
    };
    fetchData();
    setTimeout(() => {}, 1000);
  }, []);

  const addNote = async () => {
    setLoading(true);
    const data = {
      //TODO: change userid to loggedIn User
      userId: "malik",
      title: "Untitled",
      content: "",
    };

    const record = await pb.collection("notes").create(data);
    if (record) {
      console.log("Data loaded");
      toast.success("New note was created");
      setLoading(false);
    }
    fetchNotes();
  };

  const handleClickNote = (note, index) => {
    updateActiveNote({
      title: note.title,
      content: note.content,
      index: index,
      record_id: note.id,
    });
  };

  const handleDeleteNote = async (note) => {

    await pb.collection("notes").delete(note.id);

    await fetchNotes(); // Fetch notes again after deleting a note
    toast.error("Note was deleted");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div
        className={`w-72 dark:bg-neutral-900 ${
          sidebarVisible ? "flex sticky top-0" : "hidden"
        } p-4 h-screen flex-col justify-between border-r shadow-inner`}
      >
        <div className="flex flex-col">
          <div className="mb-3 p-2 flex justify-between">
            <div className="">NoteTaker</div>
            <div onClick={addNote} className="cursor-pointer">
              <Plus />
            </div>
          </div>
          <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            My Notes
          </h3>

          {loading ? (
            <p className="px-4 w-52">Loading...</p>
          ) : (
            notes.map((note, index) => (
              <Button
                onClick={() => handleClickNote(note, index)}
                className={`w-52 overflow-hidden justify-start font-normal`}
                variant="ghost"
                key={index}
              >
                <div className="items-center w-full flex justify-between">
                  <div className="overflow-hidden">
                    {contentReady && note.title}
                  </div>
                  <Link
                    href="/"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop event propagation
                      handleDeleteNote(note);
                    }}
                    // className={cn(
                    //   buttonVariants({ variant: "ghost" })
                    //   // "absolute right-4 top-4 md:right-8 md:top-8"
                    // )}
                  >
                    <Trash2 className="w-4 hover:text-red-500" />
                  </Link>
                  {/* <button
                    className="z-10"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop event propagation
                      handleDeleteNote(note);
                    }}
                  >
                    <Trash2 className="w-4 hover:text-red-500" />
                  </button> */}
                </div>
              </Button>
            ))
          )}
        </div>
        <div>Username</div>
      </div>
    </>
  );
}
