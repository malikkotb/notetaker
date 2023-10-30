"use client"
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { useState } from "react";
export default function Home() {

  const [sidebarOpen, setOpenLeftMenu] = useState(false);

  //TODO: make siebdar hidden & button visible for smaller screens

  function toggleSidebar() {
    // left sidebar menu
    setOpenLeftMenu(!leftMenuOpen);
  }

  return (
    <div className="flex m-0">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Editor />
    </div>
  );
}
