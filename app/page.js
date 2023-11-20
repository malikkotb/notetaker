"use client";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import Login from "../components/authentication/Login";
import useMyStore from "./(store)/store";
export default function Home() {
  const { authenticated } = useMyStore();
  const [sidebarVisible, setSidebarVisible] = useState(true);
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

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <>
      {!authenticated ? (
        <Login />
      ) : (
        <div className="flex m-0">
          <Sidebar
            sidebarVisible={sidebarVisible}
          />
          <Editor toggleSidebar={toggleSidebar} />
        </div>
      )}
    </>
  );
}
