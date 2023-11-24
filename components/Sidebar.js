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
import useAddNote from "@/app/(hooks)/useAddNote";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useLogout from "@/app/(hooks)/useLogout";

export default function Sidebar({ sidebarVisible, notes, isLoading }) {
  const { updateActiveNote, activeNote } = useMyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef();
  const queryClient = useQueryClient();
  const logout = useLogout();

  const { mutate, isSuccess: isSuccessAddNote } = useAddNote();

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
      record_id: note.record_id,
    });
  };

  const { mutate: deleteNoteMutation } = useMutation({
    mutationFn: async (note) => {
      await pb.collection("notes").delete(note.record_id);
    },
    onSuccess: () => {
      toast.error("Note was deleted");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <>
      <Toaster position="top-right" richColors />
      <div
        className={` w-80 dark:bg-neutral-900 ${
          sidebarVisible ? "flex sticky top-0" : "hidden"
        } h-screen flex-col justify-between border-r shadow-inner`}
      >
        <div className="p-4 flex flex-col">
          <div className="flex justify-between mb-2 px-2">
            <h3 className="text-lg font-semibold tracking-tight">
              My Notes
              {/* TODO: Display current category here */}
            </h3>
            <div onClick={addNote} className="cursor-pointer">
              <Plus />
            </div>
          </div>
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
                    index === activeNote?.index
                      ? " bg-zinc-100 dark:bg-neutral-800"
                      : ""
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
                        deleteNoteMutation(note);
                      }}
                    >
                      <Trash2 className="w-4 hover:text-red-500" />
                    </Link>
                  </div>
                </Button>
              ))
          )}
        </div>
       
      </div>
    </>
  );
}
