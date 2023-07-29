import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function StyleBar() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isLink, setIsLink] = useState(false);

  function handleToggleBold() {
    setIsBold(!isBold);

    const textarea = document.getElementById("myTextarea");
    const selectedText = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    // Add your desired functionality here
    // For example, you can display an alert with the selected text
    alert(`Selected Text: ${selectedText}`);

    // Restore the selection by setting the selection range again
    textarea.focus();
    textarea.setSelectionRange(textarea.selectionStart, textarea.selectionEnd);
  }

  function handleToggleItalic() {
    setIsItalic(!isItalic);
  }

  function handleToggleUnderline() {
    setIsUnderline(!isUnderline);
  }

  function handleAlignmentChange(alignment) {
    setAlignment(alignment);
  }

  function handleToggleOrderedList() {
    setIsOrderedList(!isOrderedList);
  }

  function handleToggleUnorderedList() {
    setIsUnorderedList(!isUnorderedList);
  }

  function handleToggleHighlighted() {
    setIsHighlighted(!isHighlighted);
  }

  function handleToggleLink() {
    setIsLink(!isLink);
  }

  function insertImage() {
    console.log("insert Image");
  }

  function insertVideo() {
    console.log("insert video");
  }

  function deleteNote() {
    console.log("delete note");
  }

  return (
    <>

      <div className="flex h-8">
        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleBold}
        >
          <i className="fa-solid fa-bold"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleItalic}
        >
          <i className="fa-solid fa-italic"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleUnderline}
        >
          <i className="fa-solid fa-underline"></i>
        </button>

        <button
          className={`px-4 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleHighlighted}
        >
          <i className="fa-solid fa-highlighter"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleUnorderedList}
        >
          <i className="fa-solid fa-list-ul"></i>
        </button>

        <button
          className={`px-2 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleOrderedList}
        >
          <i className="fa-solid fa-list-ol"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => handleAlignmentChange("left")}
        >
          <i className="fa-solid fa-align-left"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => handleAlignmentChange("center")}
        >
          <i className="fa-solid fa-align-center"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => handleAlignmentChange("right")}
        >
          <i className="fa-solid fa-align-right"></i>
        </button>

        <button
          className={`pl-4 pr-2 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={handleToggleLink}
        >
          <i className="fas fa-link fa-flip-horizontal"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={insertImage}
        >
          <i className="fa-regular fa-image"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={insertVideo}
        >
          <i className="fa-solid fa-film"></i>
        </button>

        {/* Open the modal using ID.showModal() method */}
        <button
          className={`px-2.5 py-0.5`}
          onClick={() => window.my_modal_5.showModal()}
        >
          <i className="fa-solid fa-trash text-red-700"></i>
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Delete Note</h3>
            <p className="py-4">
              Are you sure you want to delete the note?
              <br />
              This action is irreversible.
            </p>

            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn cursor-pointer bg-red-700 text-white hover:bg-red-900"
                onClick={deleteNote}
              >
                Delete
              </button>
              <button className="btn cursor-pointer">Cancel</button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default StyleBar;

/* <div className="align-center dropdown dropdown-right dropdown-start">
          <label
            tabIndex={0}
            className="btn btn-sm outline-none border-white hover:bg-white hover:border-white bg-white hover:text-blue-300"
          >
            <i className={`fa-solid fa-align-${alignment}`}></i>
          </label>
          <ul
            tabIndex={0}
            className="px-1 dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-9"
          >
            <li>
              <a className="p-2" onClick={() => handleAlignmentChange("left")}>
                <i className="fa-solid fa-align-left"></i>
              </a>
            </li>
            <li>
              <a
                className="p-2"
                onClick={() => handleAlignmentChange("center")}
              >
                <div className="text-center">
                  <i className="text-center fa-solid fa-align-center"></i>
                </div>
              </a>
            </li>
            <li>
              <a className="p-2" onClick={() => handleAlignmentChange("right")}>
                <i className="fa-solid fa-align-right"></i>
              </a>
            </li>
          </ul>
        </div> */
