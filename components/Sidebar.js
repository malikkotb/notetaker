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
import { Button } from "../components/ui/button";

import {
  bold,
  book,
  italic,
  medium,
  semiBolditalic,
  thin,
} from "../app/myFont/Fonts";

function removeHtmlTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, " ");
}

export default function Sidebar({ notes, isLoading }) {
  const { updateActiveNote, activeNote, activeCategory, sidebarVisible, updateActiveCategory } =
    useMyStore();
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

  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: async (category) => {
      // await pb.collection("notes").delete(note.record_id);
      await pb.collection('categories').delete(category.categoryId);
    },
    onSuccess: () => {
      toast.error("Category was deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // reset both active cateogry and active note after deleting a category
      updateActiveCategory(null);
      updateActiveNote(null);
    },
  });

  return (
    <>
      <Toaster position="top-right" richColors />
      {activeCategory && (
        <div
          className={`w-64 flex-shrink-0 bg-customWhite text-customBlack dark:text-customWhite dark:bg-customBlack ${
            sidebarVisible ? "flex sticky top-0" : "hidden"
          } h-screen overflow-hidden flex-col justify-between`}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center pt-4 px-4">
              <h3 className={`${medium?.className} text-lg tracking-wider`}>
                {activeCategory.name}
              </h3>
              <div className="flex gap-2 items-center">
                
                <Link
                  href="/"
                  onClick={(e) => {
                    // e.stopPropagation(); // Stop event propagation
                    deleteCategoryMutation(activeCategory);
                  }}
                >
                  <Trash2 className="w-4 hover:text-red-500" />
                </Link>
              </div>
            </div>

            <div className="p-2">
              <Input
                className="px-4 my-2"
                placeholder="Search notes..."
                type="text"
                ref={searchInput}
                onChange={handleSearch}
              />
            </div>

            <Button variant="outline" className={`hover:bg-zinc-200 p-2 mx-2 mb-4 ${medium?.className}`} onClick={addNote}>
              <span className="text-xl">+&nbsp;&nbsp;</span>Add Note
            </Button>
            {/* <div className="p-2 pt-0">
              <Button variant="outline" className="px-4 my-2" onClick={addNote}>
                Add Note
              </Button>
            </div> */}

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
                    {/* <BlurryDivider /> */}
                    <div
                      onClick={() => handleClickNote(note, index)}
                      // hover:bg-zinc-100 dark:hover:bg-zinc-800
                      className={`w-64 h-28 p-3 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md overflow-hidden justify-start font-normal ${
                        note.record_id === activeNote?.record_id
                          ? "bg-zinc-200 dark:bg-zinc-800"
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
                        <div
                          className={`${medium?.className} overflow-hidden font-bold`}
                        >
                          {note.title}
                        </div>
                        <div className="text-sm opacity-60 overflow-hidden line-clamp-2">
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
