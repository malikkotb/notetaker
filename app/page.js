import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
export default function Home() {
  return (
    <div className="flex m-0">
      <div className="w-1/5 h-screen bg-gray-200 p-4">
        <Sidebar />
      </div>
      <div className="w-4/5 bg-white p-4">
        <Editor />
      </div>
    </div>
  );
}
