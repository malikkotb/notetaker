"use client";
import Sidebar from "../../components/Sidebar";
import Editor from "../../components/Editor";
import { useEffect, useState } from "react";
import useNotesQuery from "../(hooks)/useNotesQuery";
import useCatQuery from "../(hooks)/useCatQuery";
import useTagQuery from "../(hooks)/useTagQuery";
import SideBarCategories from "../../components/SideBarCategories";
import useMyStore from "../(store)/store";
import useLogout from "../(hooks)/useLogout";
import { useRouter } from "next/navigation";
import pb from "../(lib)/pocketbase";

export default function Home() {
  const {
    authenticated,
    updateActiveNote,
    updateActiveCategory,
    setSidebarVisible,
    sidebarVisible,
    setShowEditor,
  } = useMyStore();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      // setSidebarVisible(window.innerWidth >= 768);
      console.log("");
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 768) {
      console.log("mobile screen -> editor initially hidden");
      // setShowEditor(false);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (!authenticated) {
      updateActiveNote(null);
      updateActiveCategory(null);
      // router.refresh();
      // pb.authStore.clear();

      // router.push("/");
    }
  }, [authenticated]);

  const { data: notes, isLoading, isError, error } = useNotesQuery();
  const {
    data: categories,
    isLoading: catsLoading,
    isError: catIsError,
    error: catError,
  } = useCatQuery();
  const {
    data: tags,
    isLoading: tagsLoading,
    isError: tagsIsError,
    error: tagsError,
  } = useTagQuery();
  if (isError) {
    console.log("Error fetching notes: ", error.message);
  }

  if (catIsError) {
    console.log("Error fetching categories: ", catError.message);
  }

  if (tagsIsError) {
    console.log("Error fetching categories: ", tagsError.message);
  }

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className="flex m-0 ">
      <SideBarCategories
        categories={categories}
        isLoading={catsLoading}
        tags={tags}
      />
      <Sidebar isLoading={isLoading} notes={notes} tags={tags} />
      <Editor
        notes={notes}
        toggleSidebar={toggleSidebar}
        sidebarVisible={sidebarVisible}
      />
    </div>
  );
}
