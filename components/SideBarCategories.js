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
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  bold,
  book,
  italic,
  medium,
  semiBolditalic,
  thin,
} from "../app/myFont/Fonts";

import getGreeting from "../app/(util)/greeting";
import useWindowWidth from "../app/(hooks)/useWindowWidth";

export default function SideBarCategories({
  categories,
  isLoading,
  sidebarVisible,
}) {
  const {
    updateActiveCategory,
    activeCategory,
    authenticated,
    setSidebarVisible,
    totalNotes,
    catSidebarVisible,
    setCatSidebarVisible,
  } = useMyStore();
  const { mutate, isSuccess: isSuccesAddCategory } = useAddCategory();
  const logout = useLogout();
  const inputRef = useRef();
  const width = useWindowWidth();

  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleAddCategory = () => {
    const name = inputRef.current.value;
    console.log("emoji: ", chosenEmoji.native);
    if (chosenEmoji !== null && (name !== "" || name !== null)) {
      addCategory(name);
      setChosenEmoji(null);
    }
  };

  const handleEmojiClick = (emoji) => {
    setChosenEmoji(emoji);
    setShowPicker(false);
  };

  const addCategory = async (name) => {
    const data = {
      userId: pb.authStore.model.id,
      name: name,
      emoji: chosenEmoji.native,
    };
    mutate(data);
    if (isSuccesAddCategory) {
      toast.success("New category added");
    }
  };

  const addTags = async (name) => {};

  const handleClickCategory = (category, index) => {
    updateActiveCategory({
      name: category.name,
      index: index,
      categoryId: category.categoryId,
    });

    // TODO: on mobile: show only sidebar (notes) when clicking on category
    // setCatSidebar (-> false)
    // and when showing categorySidebar -> also full screen

    if (width > 0 && width <= 500) {
      console.log("small screens");
      setCatSidebarVisible(); // this will hide the category sidebar
      // and then show sidebar (notes)
      setSidebarVisible(true);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex">
        <div
          className={`relative top-0 text-customBlack dark:text-customWhite bg-customWhite dark:bg-customBlack 
        h-screen flex-col justify-between w-full md:w-[250px] transition-all duration-500 ${
          catSidebarVisible ? "flex sticky top-0" : "hidden"
        }`}
        >
          <div>
            {/* TODO: refactor this into component: */}
            <div className="py-4 flex items-center border-b mx-6 justify-between">
              <div className="text-sm">
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

            <div className={` gap-2 w-full px-6 py-2 mt-4 items-center`}>
              <div className={`${book?.className} text-4xl tracking-wide`}>
                your
                <br />
                <div className="justify-between flex">
                  <span>&nbsp;&nbsp;notes</span>
                  <div className="text-2xl opacity-70 my-2">
                    /&nbsp;{totalNotes}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex ${
                catSidebarVisible ? "justify-between" : "justify-center"
              } items-center w-full px-6 py-2 my-4`}
            >
              <div className="font-bold tracking-widest">categories</div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <Plus />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[350px] border dark:bg-customBlack dark:text-customWhite ">
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
              <p className="px-6 w-52">Loading...</p>
            ) : (
              categories?.map((category, index) => (
                // A single category:
                <div
                  key={index}
                  className={`px-2 py-0.5 mx-6 rounded-lg flex items-center gap-2 cursor-pointer text-xl tracking-wide 
                   
                  hover:bg-customOrange hover:text-customBlack
              ${
                index === activeCategory?.index
                  ? "bg-customOrange text-customBlack"
                  : ""
              } `}
                  onClick={() => handleClickCategory(category, index)}
                >
                  <div>{category.emoji}</div>
                  <div className="text-base line-clamp-1">{category.name}</div>
                </div>
              ))
            )}

            <div
              className={`flex justify-between items-center w-full px-6 py-2 my-4`}
            >
              <div className="font-bold tracking-widest">tags</div>
              <div
                //   onClick={addTags}
                className="cursor-pointer"
              >
                <Plus />
              </div>
            </div>

            {/* tags for this user*/}
            <div className="p-4">
              {/* display tags as list */}
              <button className="px-2 py-1 m-[2px] rounded-full border dark:border-customWhite dark:bg-customBlack dark:text-customWhite">
                #work
              </button>
              <button className="px-2 py-1 m-[2px] rounded-full border dark:border-customWhite dark:bg-customBlack dark:text-customWhite">
                #home
              </button>
              <button className="px-2 py-1 m-[2px] rounded-full border bg-customOrange text-customBlack dark:border-customOrange dark:bg-customOrange dark:text-customBlack">
                #active
              </button>
              <button className="px-2 py-1 m-[2px] rounded-full border dark:border-customWhite dark:bg-customBlack dark:text-customWhite">
                #personal
              </button>
              <button className="px-2 py-1 m-[2px] rounded-full border dark:border-customWhite dark:bg-customBlack dark:text-customWhite">
                #work
              </button>
              <button className="px-2 py-1 m-[2px] rounded-full border dark:border-customWhite dark:bg-customBlack dark:text-customWhite">
                #work
              </button>
              <button className="px-2 py-1 m-[2px] rounded-full border dark:border-customWhite dark:bg-customBlack dark:text-customWhite">
                #work
              </button>
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
