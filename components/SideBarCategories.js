import { Plus } from "lucide-react";

export default function SideBarCategories({ catSidebarVisible }) {

    const addCategory = async () => {

    }

  return (
    <div
      className={`w-72 bg-blue-400 dark:bg-neutral-900 ${
        catSidebarVisible ? "flex sticky top-0" : "hidden"
      } h-screen flex-col justify-between border-r shadow-inner`}
    >
      <div>
        <div className="w-full px-4 py-2 mt-4">All Notes</div>
        <div className="flex justify-between w-full px-4 py-2">
          <div className="">Notbeooks</div>
          <div onClick={addCategory} className="cursor-pointer">
              <Plus />
            </div>
        </div>
      </div>
    </div>
  );
}
