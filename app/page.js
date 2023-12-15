"use client";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import useNotesQuery from "./(hooks)/useNotesQuery";
import useCatQuery from "@/app/(hooks)/useCatQuery";
import SideBarCategories from "../components/SideBarCategories";
import useMyStore from "./(store)/store";
import useLogout from "./(hooks)/useLogout";
import { useRouter } from "next/navigation";
import pb from "./(lib)/pocketbase";

export default function Home() {
  const { authenticated, updateActiveNote, updateActiveCategory, setSidebarVisible, sidebarVisible, setShowEditor } =
    useMyStore();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 768) {
      console.log("mobile screen -> editor initially hidden");
      setShowEditor(false);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!authenticated) {
      console.log("should reload now and go to /login");
      updateActiveNote(null);
      updateActiveCategory(null);
      // router.refresh();
      // pb.authStore.clear();
      router.push("/login");
    }
  }, [authenticated]);

  const { data: notes, isLoading, isError, error } = useNotesQuery();
  const {
    data: categories,
    isLoading: catsLoading,
    isError: catIsError,
    error: catError,
  } = useCatQuery();

  if (isError) {
    console.log("Error fetching notes: ", error.message);
  }

  if (catIsError) {
    console.log("Error fetching categories: ", catError.message);
  }

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className="flex m-0 ">
      <SideBarCategories
        categories={categories}
        isLoading={catsLoading}
      />
      <Sidebar
        isLoading={isLoading}
        notes={notes}
      />
      <Editor notes={notes} toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
    </div>
  );
}
