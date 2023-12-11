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
import BlurryDivider from "./BlurryDivider";

function removeHtmlTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, " ");
}

export default function Sidebar({ notes, isLoading }) {
  const { updateActiveNote, activeNote, activeCategory, sidebarVisible } = useMyStore();
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef();
  const queryClient = useQueryClient();

  const { mutate, isSuccess: isSuccessAddNote } = useAddNote();

  const addNote = async () => {
    const data = {
      userId: pb.authStore.model.id,
      title: "Untitled",
      content: "",
      category: activeCategory.categoryId,
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
      updateActiveNote(null);
    },
  });

  return (
    <>
      <Toaster position="top-right" richColors />
      {activeCategory && (
        <div
          className={`w-64 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 ${
            sidebarVisible ? "flex sticky top-0" : "hidden"
          } h-screen overflow-hidden flex-col justify-between shadow-inner`}
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
                ?.filter(
                  (note) =>
                    note.title.toLowerCase().includes(searchTerm) &&
                    note.categoryId === activeCategory.categoryId
                )
                .map((note, index) => (
                  // A single note:
                  <div key={index}>
                    <BlurryDivider />
                    <div
                      onClick={() => handleClickNote(note, index)}
                      // hover:bg-zinc-100 dark:hover:bg-zinc-800
                      className={`w-64 h-28 p-3 cursor-pointer rounded-md overflow-hidden justify-start font-normal ${
                        note.record_id === activeNote?.record_id
                          ? "bg-[#2B99D6] text-white"
                          : ""
                      }`}
                      variant="ghost"
                      key={index}
                    >
                      {/* Category */}
                      <div className="items-center w-full flex justify-between">
                        <div className="overflow-hidden text-xs">
                          {activeCategory.name}
                        </div>
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
                        <div className="text-sm overflow-hidden line-clamp-2">
                          {/* text-zinc-600 dark:text-zinc-300 */}
                          {removeHtmlTags(note.content)}
                        </div>
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
