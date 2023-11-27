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
import useAddCategory from "../app/(hooks)/useAddCategory";

export default function SideBarCategories({
  catSidebarVisible,
  categories,
  isLoading,
}) {
  const { updateActiveCategory, activeCategory } = useMyStore();
  const { mutate, isSuccess: isSuccesAddCategory } = useAddCategory();

  //TODO: add new category
  const addCategory = async () => {};
  const logout = useLogout();

  //TODO: selected feature for categories
  //TODO: functionality to hiding SideBarCategories

  const handleClickCategory = (category, index) => {
    // Category: name, notes, categoryId
    console.log(category);
    updateActiveCategory({
      name: category.name,
      notes: category.notes,
      index: index,
      categoryId: category.categoryId,
    });

    //  TODO: refetch 
    // TODO: invalidateQueries 

  };

  return (
    <div
      className={`w-96 text-white bg-blue-500 dark:bg-neutral-900 ${
        catSidebarVisible ? "flex sticky top-0" : "hidden"
      } h-screen flex-col justify-between border-r shadow-inner`}
    >
      <div>
        <div className="w-full px-8 py-2 mt-4">------</div>
        <div className="flex justify-between items-center w-full px-8 py-2 my-4">
          <div className="text-xs font-bold tracking-widest">CATEGORIES</div>
          <div onClick={addCategory} className="cursor-pointer">
            <Plus />
          </div>
        </div>

        {isLoading ? (
          <p className="px-4 w-52">Loading...</p>
        ) : (
          categories?.map((category, index) => (
            // A single category:
            <div
              key={index}
              className={`px-8 py-3 cursor-pointer hover:bg-blue-600 text-sm text-zinc-300
                ${index === activeCategory?.index ? "bg-blue-600 dark:bg-neutral-800" : ""}`}
              onClick={() => handleClickCategory(category, index)}
              >
              {category.name}
            </div>
          ))
        )}

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
