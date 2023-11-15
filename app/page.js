"use client";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import Login from "../components/authentication/Login";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  // const {fetchNotes} = useMyStore();
  useEffect(() => {
    // fetchNotes();

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
      {loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <div className="flex m-0">
          <Sidebar
            sidebarVisible={sidebarVisible}
            loading={loading}
            setLoading={setLoading}
          />
          <Editor toggleSidebar={toggleSidebar} loading={loading} />
        </div>
      )}
    </>
  );
}
