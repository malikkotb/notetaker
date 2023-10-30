import Tiptap from "./Tiptap";

export default function Editor() {
  return <div className="w-9/12 bg-white p-4">
    <div>Title of Note</div>
    <Tiptap />
  </div>;
}
