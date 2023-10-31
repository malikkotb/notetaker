"use client";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { ChevronLast, ChevronFirst } from "lucide-react";
import { useEffect, useState } from "react";
import useMyStore from "./(store)/store";
export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false); // TODO: change to false to begin with
  const { notes } = useMyStore();
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function toggleSidebar() {
    // left sidebar menu
    console.log("open sidebar");
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div className="flex m-0">
      <Sidebar notes={notes} sidebarVisible={sidebarVisible} />
      <Editor toggleSidebar={toggleSidebar} />
    </div>
  );
}
