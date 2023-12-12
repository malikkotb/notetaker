import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import useLogout from "@/app/(hooks)/useLogout";
import pb from "../app/(lib)/pocketbase";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { CaretDownIcon } from "@radix-ui/react-icons";
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

export default function SideBarCategories({ categories, isLoading }) {
  const {
    updateActiveCategory,
    activeCategory,
    authenticated,
    setSidebarVisible,
  } = useMyStore();
  const { mutate, isSuccess: isSuccesAddCategory } = useAddCategory();
  const logout = useLogout();
  const inputRef = useRef();
  const [catSidebarVisible, setCatSidebarVisible] = useState(true);

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

  const handleClickCategory = (category, index) => {
    updateActiveCategory({
      name: category.name,
      index: index,
      categoryId: category.categoryId,
    });
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex sticky top-0">
        <div
          className={`relative flex top-0 text-customBlack dark:text-customWhite bg-customWhite dark:bg-customBlack 
        h-screen flex-col justify-between w-[250px] transition-all duration-500 ${
          catSidebarVisible ? "flex" : "hidden"
        }`}
        >
          <div>
            <div
              className={`justify-between gap-2 w-full px-8 py-2 mt-4 flex items-center`}
            >
              <div className={`${medium?.className} text-lg tracking-wider`}>
                {catSidebarVisible && "NoteTaker"}
              </div>
            </div>
            <div
              className={`flex ${
                catSidebarVisible ? "justify-between" : "justify-center"
              } items-center w-full px-8 py-2 my-4`}
            >
              <div className="font-bold tracking-widest">
                categories
              </div>
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
                      <div className="w-full justify-center gap-2 py-2">
                        <div className="flex justify-between items-center">
                          <Button onClick={() => setShowPicker(!showPicker)}>
                            Select Icon
                          </Button>
                          {chosenEmoji && (
                            <div className="text-2xl">{chosenEmoji.native}</div>
                          )}
                        </div>
                        {showPicker && (
                          <div className="overflow-hidden h-60">
                            <Picker
                              data={data}
                              onEmojiSelect={handleEmojiClick}
                              navPosition="top"
                              perLine={7}
                              maxFrequentRows={0}
                              previewPosition="none"
                            />
                          </div>
                        )}
                      </div>
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
              <p className="px-4 w-52">Loading...</p>
            ) : (
              categories?.map((category, index) => (
                // A single category:
                <div
                  key={index}
                  className={`px-8 py-0.5 mx-2 rounded-lg flex items-center gap-2 cursor-pointer text-xl tracking-wide ${medium.className} hover:bg-customOrange hover:text-customBlack
              ${
                index === activeCategory?.index
                  ? "bg-customOrange text-customBlack"
                  : ""
              } `}
                  onClick={() => handleClickCategory(category, index)}
                >
                  <div>{category.emoji}</div>
                  <div className="text-sm line-clamp-1">{category.name}</div>
                </div>
              ))
            )}

            <div
              className={`flex justify-between items-center w-full px-8 py-2 my-4`}>
              <div className="font-bold tracking-widest">
                tags
              </div>
              <div
                //   onClick={addTags}
                className="cursor-pointer">
                <Plus />
              </div>
            </div>
          </div>

          {/* TODO: refactor this into component: */}
          <div className="p-4 flex items-center justify-center">
              <div className="text-sm"><span className="opacity-70">{getGreeting()}</span>&nbsp;{pb.authStore.model?.email}</div>
            <div className={`ml-2`}>
              <Popover>
                <PopoverTrigger>
                  <CaretDownIcon />
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
        </div>

        {/* Sidebar chevron div */}
        <div className="h-screen border-l dark:border-black transition-all duration-300 bg-customWhite dark:bg-customBlack flex items-center justify-center text-center">
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
