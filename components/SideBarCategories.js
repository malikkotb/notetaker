import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import useLogout from "@/app/(hooks)/useLogout";
import pb from "../app/(lib)/pocketbase";
import { useMutation } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import useMyStore from "@/app/(store)/store";
import useAddCategory from "../app/(hooks)/useAddCategory";
import { Toaster, toast } from "sonner";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { book } from "../app/myFont/Fonts";

import getGreeting from "../app/(util)/greeting";
import useWindowWidth from "../app/(hooks)/useWindowWidth";
import useAddTag from "../app/(hooks)/useAddTag";
import useUpdateTag from "../app/(hooks)/useUpdateTag";

export default function SideBarCategories({ categories, isLoading, tags }) {
  const {
    updateActiveCategory,
    activeCategory,
    setSidebarVisible,
    totalNotes,
    catSidebarVisible,
    setCatSidebarVisible,
    activeNote,
  } = useMyStore();
  const { mutate, isSuccess: isSuccesAddCategory } = useAddCategory();
  const { mutate: mutateTags, isSuccess: isAddTagSuccess } = useAddTag();
  const logout = useLogout();
  const inputRef = useRef();
  const tagNameRef = useRef();
  const width = useWindowWidth();
  const { mutate: updateTag } = useUpdateTag();

  const handleAddCategory = () => {
    const name = inputRef.current.value;
    if (name === "" || name !== null) {
      addCategory(name);
    }
  };

  const addCategory = async (name) => {
    const data = {
      userId: pb.authStore.model.id,
      name: name,
    };
    mutate(data);
    if (isSuccesAddCategory) {
      toast.success("New category added");
    }
  };

  const handleClickCategory = (tag) => {
    updateActiveCategory({
      tag: tag,
    });

    //on mobile: show only sidebar (notes) when clicking on category
    // setCatSidebar (-> false)
    // and when showing categorySidebar -> also full screen

    if (width > 0 && width <= 500) {
      console.log("small screens");
      setCatSidebarVisible(); // this will hide the category sidebar
      // and then show sidebar (notes)
    }
    setSidebarVisible(true);
  };

  const handleAddTag = () => {
    const name = tagNameRef.current.value;
    if (name === "" || name !== null) {
      addTag(name);
    }
  };

  const addTag = async (name) => {
    const data = {
      userId: pb.authStore.model.id,
      name: name,
    };
    mutateTags(data);
    if (isAddTagSuccess) {
      toast.success("New tag added");
    }
  };

  const handleClickTag = (tagId) => {
    // if there is no current active note -> ignore the click of a tag
    if (activeNote && activeCategory) {
      // when clicking a tag jsut update the currently active note with that tag
      const data = {
        tag: tagId,
      };
      updateTag(data);
      toast.success("Tag updated");
    } else {
      console.log("cant put a tag on noting");
    }
  };

  const tagHighlighting = (tag) => {
    if (activeNote && activeNote.tagId === tag.tagId) {
      return "bg-customOrange text-customBlack dark:text-customBlack dark:bg-customOrange dark:border-customOrange";
    } else {
      return "dark:border-customWhite dark:bg-customBlack dark:text-customWhite";
    }
  };

  const getTagName = () => {
    const tag = tags.find((tag) => tag.tagId === activeNote.tagId);
    return tag ? tag.name : "";
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex">
        <div
          className={`relative top-0 text-customBlack dark:text-customWhite bg-customWhite dark:bg-customBlack 
        h-screen flex-col justify-between w-screen sm:w-[250px] transition-all duration-500 ${
          catSidebarVisible ? "flex sticky top-0" : "hidden"
        }`}
        >
          <div>
            {/* TODO: refactor this into component: */}
            <div className="pt-8 pb-4 sm:py-4 flex items-center border-b mx-10 sm:mx-6 justify-between">
              <div className="text-base sm:text-sm">
                <span className="opacity-70">{getGreeting()}</span>&nbsp;
                {pb.authStore.model?.email}
              </div>
              <div className={`mt-1 ml-2`}>
                <Popover>
                  <PopoverTrigger>
                    <DotsVerticalIcon />
                  </PopoverTrigger>
                  <PopoverContent className="px-4 py-2">
                    {!catSidebarVisible && (
                      <div className="text-sm">{pb.authStore.model?.email}</div>
                    )}
                    <Button variant={"ghost"} onClick={() => logout()}>
                      Log Out
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div
              className={`gap-2 w-full px-10 sm:px-6 sm:py-2 mt-4 items-center`}
            >
              <div
                className={`${book?.className} text-7xl sm:text-4xl tracking-wide`}
              >
                your
                <br />
                <div className="justify-between flex">
                  <span>&nbsp;&nbsp;notes</span>
                  <div className="text-2xl sm:text-2xl opacity-70 mb-0 mt-5 sm:my-2">
                    /&nbsp;{totalNotes}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex ${
                catSidebarVisible ? "justify-between" : "justify-center"
              } items-center w-full px-10 sm:px-6 py-2 my-4`}
            >
              <div className="font-bold tracking-widest text-2xl sm:text-base">
                categories
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <Plus />
                  </div>
                </DialogTrigger>
                <DialogContent className="w-80 rounded-2xl sm:max-w-[350px] border-none dark:bg-customBlack dark:text-customWhite">
                  <DialogHeader>
                    <DialogTitle>Name the category</DialogTitle>
                  </DialogHeader>
                  <div className="pt-4">
                    <div className="items-center gap-4">
                      <Input
                        id="name"
                        placeholder="Game changer..."
                        className=""
                        ref={inputRef}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" onClick={handleAddCategory}>
                        Add Category
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {isLoading ? (
              <p className="px-10 sm:px-6 w-52">Loading...</p>
            ) : (
              categories?.map((category, index) => (
                // A single category:
                <div
                  key={index}
                  className={`mx-10 px-3 py-3 sm:px-2 sm:py-2 sm:mx-0 rounded-3xl sm:rounded-none flex items-center gap-2 cursor-pointer text-xl tracking-wide 
                  hover:bg-customOrange hover:text-customBlack
              ${
                index === activeCategory?.index
                  ? "bg-customOrange text-customBlack"
                  : ""
              } `}
                  onClick={() => handleClickCategory(category, index)}
                >
                  <div className="text-xl pl-4 sm:pl-4 sm:text-base line-clamp-1">
                    {category.name}
                  </div>
                </div>
              ))
            )}

            <div
              className={`flex justify-between items-center w-full px-10 sm:px-6 sm:py-2 my-4 mb-0`}
            >
              <div className="font-bold tracking-widest text-2xl sm:text-base">
                tags
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <Plus />
                  </div>
                </DialogTrigger>
                <DialogContent className="w-80 rounded-2xl sm:max-w-[350px] border-none dark:bg-customBlack dark:text-customWhite">
                  <DialogHeader>
                    <DialogTitle>Name your tag</DialogTitle>
                  </DialogHeader>
                  <div className="pt-4">
                    <div className="items-center gap-4">
                      <Input
                        id="name"
                        placeholder="Name..."
                        className=""
                        ref={tagNameRef}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" onClick={handleAddTag}>
                        Add Tag
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="p-8 py-2 sm:p-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                tags?.map((tag, index) => (
                  // A tag:
                  <button
                    key={index}
                    className={`${tagHighlighting(
                      tag
                    )} cursor-pointer hover:bg-customOrange hover:text-customBlack dark:hover:bg-customOrange dark:hover:border-customOrange dark:hover:text-customBlack cursor-pointer text-2xl sm:text-base px-4 sm:px-2 py-1 m-1 sm:m-[2px] rounded-full border`}
                    onClick={() => handleClickTag(tag.tagId)}
                  >
                    {tag.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar chevron div */}
        <div className="sticky hidden sm:flex top-0 h-screen border-l dark:border-black transition-all duration-300 bg-customWhite dark:bg-customBlack items-center justify-center text-center">
          <div
            onClick={() => setCatSidebarVisible(!catSidebarVisible)}
            className={`text-center opacity-50 hover:opacity-100 cursor-pointer`}
          >
            {catSidebarVisible ? <ChevronLeft /> : <ChevronRight />}
          </div>
        </div>
      </div>
    </>
  );
}
