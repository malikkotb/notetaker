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
import Image from "next/image";

export default function SideBarCategories({ categories, isLoading }) {
  const { updateActiveCategory, activeCategory, authenticated } = useMyStore();
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
      <div
        className={`flex sticky top-0 text-black dark:text-white bg-white/20 backdrop-blur-md dark:bg-zinc-900/70 
        h-screen flex-col justify-between border-r dark:border-black shadow-inner w-20 hover:w-64 transition-all duration-300`}
        style={{ width: catSidebarVisible ? "250px" : "80px" }}
      >
        <div>
          <div className={`${catSidebarVisible ? "justify-between gap-2" : "justify-center"} w-full px-8 py-2 mt-4 flex items-center`}>
            <div className={`${!catSidebarVisible ? "cursor-pointer" : "" } w-10 h-10 flex-shrink-0`} onClick={() => setCatSidebarVisible(!catSidebarVisible)}>
              <img alt="logo" src="/sb_logo.png" className="rounded-md" />
            </div>
            {/* <Image
              width={30}
              height={30}
              alt="logo"
              src="/sb_logo.png"
              className="rounded-md"
            ></Image> */}
            <div className="text-sm font-bold">{catSidebarVisible && "SecondBrain"}</div>
            {catSidebarVisible && (
              <div
                className="cursor-pointer"
                onClick={() => setCatSidebarVisible(!catSidebarVisible)}
              >
                <ChevronLeft />
              </div>
            )}
          </div>
          <div
            className={`flex ${
              catSidebarVisible ? "justify-between" : "justify-center"
            } items-center w-full px-8 py-2 my-4`}
          >
            <div className="text-xs font-bold tracking-widest">
              {catSidebarVisible && "CATEGORIES"}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Plus />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[350px] bg-white">
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
                className={`px-8 py-3 flex items-center gap-2 cursor-pointer hover:bg-blue-600 text-lg text-zinc-300
              ${
                index === activeCategory?.index
                  ? "bg-blue-600 dark:bg-neutral-800"
                  : ""
              }`}
                onClick={() => handleClickCategory(category, index)}
              >
                <div>{category.emoji}</div> 
                <div className="text-sm line-clamp-1">{catSidebarVisible && category.name}</div>
              </div>
            ))
          )}

          <div className="mt-4 flex justify-between items-center w-full px-8 py-2">
            <div
              className={`${
                catSidebarVisible ? "justify-between" : "justify-center"
              } text-xs font-bold tracking-widest`}
            >
              {catSidebarVisible && "TAGS"}
            </div>
            <div
              //   onClick={addTags}
              className="cursor-pointer"
            >
              <Plus />
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-center">
          {catSidebarVisible && (
            <div className="text-sm">{pb.authStore.model?.email}</div>
          )}
          <div className={`${catSidebarVisible ? "ml-2" : ""}`}>
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
    </>
  );
}
