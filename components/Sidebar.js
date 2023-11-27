"use client";
import { useState, useRef } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import useMyStore from "../app/(store)/store";
import pb from "../app/(lib)/pocketbase";
import { Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { Input } from "./ui/input";
import useAddNote from "@/app/(hooks)/useAddNote";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function removeHtmlTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, " ");
}

export default function Sidebar({ sidebarVisible, notes, isLoading }) {
  const { updateActiveNote, activeNote, activeCategory } = useMyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef();
  const queryClient = useQueryClient();

  const { mutate, isSuccess: isSuccessAddNote } = useAddNote();

  const addNote = async () => {
    const data = {
      userId: pb.authStore.model.id,
      title: "Untitled",
      content: "",
      category: activeCategory.id
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
      {activeCategory && (
        <div
          className={` w-80 dark:bg-neutral-900 ${
            sidebarVisible ? "flex sticky top-0" : "hidden"
          } h-screen flex-col justify-between border-r shadow-inner`}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center pt-4 px-4">
              <h3 className="text-lg font-semibold tracking-tight">
                {activeCategory.name}
              </h3>
              <div onClick={addNote} className="cursor-pointer">
                <Pencil2Icon />
              </div>
            </div>

            <div className="p-2">
              <Input
                className="px-4 my-2"
                placeholder="Filter..."
                type="text"
                ref={searchInput}
                onChange={handleSearch}
              />
            </div>

            {isLoading ? (
              <p className="px-4 w-52">Loading...</p>
            ) : (
              notes
                ?.filter((note) =>
                  note.title.toLowerCase().includes(searchTerm)
                )
                .map((note, index) => (
                  // A single note:
                  <div
                    onClick={() => handleClickNote(note, index)}
                    className={`w-64 h-28 p-3 hover:bg-zinc-100 cursor-pointer rounded-none border-b ${
                      index === 0 ? "border-t" : ""
                    } overflow-hidden justify-start font-normal ${
                      index === activeNote?.index
                        ? "bg-zinc-100 dark:bg-neutral-800"
                        : ""
                    }`}
                    variant="ghost"
                    key={index}
                  >
                    {/* Categoty */}
                    <div className="items-center w-full flex justify-between">
                      <div className="overflow-hidden text-xs">Category</div>
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

                    {/* Title and content */}
                    <div className="">
                      <div className="overflow-hidden font-bold">
                        {note.title}
                      </div>
                      <div className="text-sm text-zinc-500 overflow-hidden line-clamp-2">
                        {removeHtmlTags(note.content)}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
