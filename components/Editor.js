import Tiptap from "./Tiptap";

export default function Editor() {
  return <div className="w-7/12 bg-white p-4">
    <div>Name of Note</div>
    <Tiptap />
  </div>;
}
