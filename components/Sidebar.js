"use client";
import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import useMyStore from "../app/(store)/store";
import { Button } from "../components/ui/button";
import PocketBase from "pocketbase";
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Sidebar({ sidebarVisible, loading, setLoading }) {
  const { updateActiveNote, notes, fetchNotes } = useMyStore();
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (loading === false) {
      console.log("update acticeNote, as new note was added or deleted");
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
  }, []);

  const addNote = async () => {
    setLoading(true);
    const pb = new PocketBase("http://127.0.0.1:8090");

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

  const deleteNote = async (note, index) => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    await pb.collection("notes").delete(note.id);


    // toast.error("Note was deleted");
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div
        className={`w-72 dark:bg-neutral-900 ${
          sidebarVisible ? "flex" : "hidden"
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
            Notes
          </h3>

          {loading ? (
            <p className="px-4">Loading...</p>
          ) : (
            notes.map((note, index) => (
              <Button
                onClick={() => handleClickNote(note, index)}
                className={`w-52 overflow-hidden justify-start font-normal`}
                variant="ghost"
                key={index}
              >
                <div className="items-center w-full flex justify-between">
                  <div className="overflow-hidden">{contentReady && note.title}</div>
                  <button
                    className="z-10"
                    onClick={() => handleDeleteNote(note, index)}
                  >
                    <Trash2 className="w-4 hover:text-red-500" />
                  </button>
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
