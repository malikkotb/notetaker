"use client"
import { ChevronLast, ChevronFirst } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {

  const [sidebarVisible, setSidebarVisible] = useState(true); // TODO: change to false to begin with
  
  return (
    <div className="w-3/12 p-4 h-screen flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="">Notetaker</div>
        <ChevronFirst color="#3e9392" />
        <ChevronLast color="#3e9392" />
        <div></div>
      </div>
      <div>Username</div>
    </div>
  );
}
