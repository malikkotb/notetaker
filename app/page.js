"use client";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { ChevronLast, ChevronFirst } from "lucide-react";
import { useEffect, useState } from "react";
export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false); // TODO: change to false to begin with

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

  // TODO: get notes from database
  const notes = [
    {
      title: "Example Title 1",
      content: "This is the content of the first example object.",
    },
    {
      title: "Sample Title 2",
      content: "Here is the content for the second example object. You can customize it as needed.",
    },
    {
      title: "Title 3",
      content: '<h2>Content for the third example object goes here. Feel free to add more details.</h2>'
    },
    {
      title: "Custom ",
      content: "This is the content for the custom object title. You can modify it to suit your requirements.",
    },
    {
      title: "JavaScript Object",
      content: "This object contains some example content. You can use it in your JavaScript program.",
    }
  ];

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
