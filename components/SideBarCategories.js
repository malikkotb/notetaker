import { Plus } from "lucide-react";
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

export default function SideBarCategories({ catSidebarVisible }) {
  const { updateActiveCategory, activeCategory } = useMyStore();
    
    //TODO: add new category
  const addCategory = async () => {};
  const logout = useLogout();

  //TODO: selected feature for categories
  //TODO: functionality to hide SideBarCategories 

  return (
    <div
      className={`w-96 text-white bg-blue-500 dark:bg-neutral-900 ${
        catSidebarVisible ? "flex sticky top-0" : "hidden"
      } h-screen flex-col justify-between border-r shadow-inner`}
    >
      <div>
        <div className="w-full px-8 py-2 mt-4">All Notes</div>
        <div className="flex justify-between items-center w-full px-8 py-2 my-4">
          <div className="text-xs font-bold tracking-widest">CATEGORIES</div>
          <div onClick={addCategory} className="cursor-pointer">
            <Plus />
          </div>
        </div>
        {/* TODO: loop over given categories for this user */}
        <div className="px-8 py-2 text-sm text-zinc-300">Business</div>
        <div className="px-8 py-2 text-sm text-zinc-300">Design</div>
        <div className="px-8 py-2 text-sm text-zinc-300">General</div>
        <div className="px-8 py-2 text-sm text-zinc-300">Journal</div>
        <div className="px-8 py-2 text-sm text-zinc-300">Personal</div>
        <div className="px-8 py-2 text-sm text-zinc-300">Programming</div>

        <div className="mt-4 flex justify-between items-center w-full px-8 py-2">
          <div className="text-xs font-bold tracking-widest">TAGS</div>
          <div
            //   onClick={addCategory}
            className="cursor-pointer"
          >
            <Plus />
          </div>
        </div>
      </div>
      <div className="p-4 px-8 w-full flex items-center justify-between">
        <div className="bg-red-400 p-4 rounded-full mr-2"></div>
        <div className="text-sm">{pb.authStore.model.email}</div>
        <div className="ml-2">
          <Popover>
            <PopoverTrigger>
              <CaretDownIcon />
            </PopoverTrigger>
            <PopoverContent className="">
              <Button variant={"ghost"} onClick={() => logout()}>
                Log Out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
