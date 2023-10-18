import NoteTitle from "./NoteTitle";
import RichTextEditor from "./RichTextEditor";
import StyleBar from "./StyleBar";
import { useRef } from "react";


function NoteWriting() {
  // TODO: make the changes be visible instantly in the NoteNavigator Sidebar
  // TODO: save the text every 3 seconds
  // TODO: make the first lines of the written text appear directly in the NoteNavigator column



  // useRef -> Ref does not cause your comonent to re-update/render when it gets changed
  const textareaRef = useRef();

  return (
    <>
      <RichTextEditor />

      <div className="pt-4 pb-6">
        <StyleBar textareaRef={textareaRef}/>
      </div>

      <NoteTitle />


      <div
          className="min-h-[600px] overflow-y-auto border border-white p-2 mt-4"
          style={{ maxHeight: "600px" }}
        >
          <div ref={textareaRef} contentEditable
          className="border-none outline-none">Enter text...</div>
      </div>

      {/* <div className="p-4">
        <textarea
          ref={textareaRef}
          id="message"
          name="message"
          className="w-full px-3 py-2 outline-none rounded-lg resize-y"
          rows="23"
          placeholder="Enter text..."
        />
      </div> */}
    </>
  );
}

export default NoteWriting;
