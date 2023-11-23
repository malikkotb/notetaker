"use client";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import Login from "./login/page";
import useMyStore from "./(store)/store";
import useNotesQuery from "./(hooks)/useNotesQuery";
import SideBarCategories from "../components/SideBarCategories";
export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [catSidebarVisible, setCatSidebarVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: notes, isLoading, isError, error } = useNotesQuery();

  if (isError) {
    console.log("Error fetching notes: ", error.message);
  }

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className="flex m-0">
      <SideBarCategories catSidebarVisible={catSidebarVisible} />
      <Sidebar
        sidebarVisible={sidebarVisible}
        isLoading={isLoading}
        notes={notes}
      />
      <Editor notes={notes} toggleSidebar={toggleSidebar} />
    </div>
  );
}
