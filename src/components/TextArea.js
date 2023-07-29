
function TextArea() {

    // TODO: save the text every 3 seconds
    // TODO: make the first lines of the written text appear directly in the NoteNavigator column
    // TODO: lift the state up somehow, to customize the text (font changes etc.)


  return (
    <>
      <div className="p-4">
        <textarea
          id="message"
          name="message"
          className="w-full px-3 py-2 outline-none rounded-lg resize-y"
          rows="23"
          placeholder="Enter text..."
        />
      </div>


    </>
  );
}

export default TextArea;
