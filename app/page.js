import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import NotesMenu from "@/components/NotesMenu";
export default function Home() {
  return (
    <div className="flex m-0">
        <Sidebar />
        <NotesMenu />
        <Editor />
    </div>
  );
}
