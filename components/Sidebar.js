"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useMyStore from "../app/(store)/store";
import { Button } from "../components/ui/button";
import PocketBase from "pocketbase";

export default function Sidebar({ sidebarVisible, loading, setLoading }) {
  const { updateActiveNote, notes, fetchNotes } = useMyStore();
  const [contentReady, setContentReady] = useState(false);

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
    setLoading(true)
    const pb = new PocketBase("http://127.0.0.1:8090");

    const data = {
      //TODO: change userid to loggedIn User
      userId: "malik",
      title: "Untitled",
      content: "<p></p>",
    };

    const record = await pb.collection("notes").create(data);
    if (record) {
      console.log("l´Loadng");
      setLoading(false)
    }
    fetchNotes();
    // updateActiveNote({ title: "", content: "", index: notes.length });
  };

  const handleClickNote = (note, index) => {
    updateActiveNote({
      title: note.title,
      content: note.content,
      index: index,
      record_id: note.id,
    });
  
  };

  return (
    <>
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
                className={` w-52 overflow-hidden justify-start font-normal`}
                variant="ghost"
                key={index}
              >
                {contentReady && note.title}
              </Button>
            ))
          )}
        </div>
        <div>Username</div>
      </div>
    </>
  );
}
