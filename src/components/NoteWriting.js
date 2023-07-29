import NoteTitle from "./NoteTitle";
import StyleBar from "./StyleBar";
import TextArea from "./TextArea";

function NoteWriting() {
  // TODO: make the changes be visible instantly in the NoteNavigator Sidebar

  return (
    <>
     <div className="pt-4 pb-6">
      <StyleBar className/>
     </div>

      <NoteTitle />

      <TextArea />
    </>
  );
}

export default NoteWriting;
