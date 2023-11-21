"use client";
import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import useMyStore from "../app/(store)/store";
import { Button } from "../components/ui/button";
import pb from "../app/(lib)/pocketbase";
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { Input } from "./ui/input";
import useNotesQuery from "../app/(hooks)/useNotesQuery";
import useAddNote from "@/app/(hooks)/useAddNote";

export default function Sidebar({ sidebarVisible }) {
  const { updateActiveNote, activeNote } = useMyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef();

  const { data: notes, isLoading, isError, error, isSuccess } = useNotesQuery();
  const { mutate, isSuccess: isSuccessAddNote } = useAddNote();

  if (isSuccess) {
    console.log(notes);
  }

  if (isError) {
    console.log("Error fetching notes: ", error.message);
  }

  // function to check: if a note was updated
  // TODO: switch to react-query method
  // useEffect(() => {
  //   if (loading === false) {
  //     console.log("update activeNote");
  //     const note = notes[notes.length - 1];

  //     updateActiveNote({
  //       title: note.title,
  //       content: note.content,
  //       index: notes.length - 1, TODO: set active note to first note in array. which is being done here
  //       record_id: note.id,
  //     });
  //   }
  // }, [notes]);

  const addNote = async () => {
    const data = {
      userId: pb.authStore.model.id,
      title: "Untitled",
      content: "",
    };

    mutate(data);
    if (isSuccessAddNote) {
      toast.success("New note was created");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(searchInput.current.value);
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
    // TODO: switch to using useQuery/useMutation hook

    //TODO: queryClient.invalidateQueries to refetch data
    // await fetchNotes(); // Fetch notes again after deleting a note
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
          <Input
            className="px-4 my-2"
            placeholder="Search..."
            type="text"
            ref={searchInput}
            onChange={handleSearch}
          />
          {isLoading ? (
            <p className="px-4 w-52">Loading...</p>
          ) : (
            notes
              ?.filter((note) => note.title.toLowerCase().includes(searchTerm))
              .map((note, index) => (
                <Button
                  onClick={() => handleClickNote(note, index)}
                  className={`w-52 overflow-hidden justify-start font-normal ${
                    index === activeNote?.index ? " bg-zinc-200" : ""
                  }`}
                  variant="ghost"
                  key={index}
                >
                  <div className="items-center w-full flex justify-between">
                    <div className="overflow-hidden">{note.title}</div>
                    <Link
                      href="/"
                      onClick={(e) => {
                        e.stopPropagation(); // Stop event propagation
                        handleDeleteNote(note);
                      }}
                    >
                      <Trash2 className="w-4 hover:text-red-500" />
                    </Link>
                  </div>
                </Button>
              ))
          )}
        </div>
        <div>{pb.authStore.model.email}</div>
      </div>
    </>
  );
}
