// import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function StyleBar() {
  function formatText(format) {
    document.execCommand(format, false, null);
  }

  function makeUnorderedList() {
    document.execCommand("insertUnorderedList", false, null);

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
          onClick={() => formatText("bold")}
        >
          <i className="fa-solid fa-bold"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("italic")}
        >
          <i className="fa-solid fa-italic"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("underline")}
        >
          <i className="fa-solid fa-underline"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("strikeThrough")}
        >
          <i className="fa-solid fa-strikethrough"></i>
        </button>

        {/* TODO: subscript, superscript */}

        <button
          className={`px-4 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("")}
        >
          <i className="fa-solid fa-highlighter"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={makeUnorderedList}
        >
          <i className="fa-solid fa-list-ul"></i>
        </button>

        <button
          className={`px-2 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("insertOrderedList")}
        >
          <i className="fa-solid fa-list-ol"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("justifyLeft")}
        >
          <i className="fa-solid fa-align-left"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("justifyCenter")}
        >
          <i className="fa-solid fa-align-center"></i>
        </button>

        <button
          className={`px-2.5 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("justifyRight")}
        >
          <i className="fa-solid fa-align-right"></i>
        </button>

        <button
          className={`pl-4 pr-2 py-0.5 transition-colors text-black hover:text-blue-500`}
          onClick={() => formatText("")}
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
          <i className="fa-solid fa-trash text-red-700 hover:text-red-900"></i>
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
                className="btn  cursor-pointer bg-red-700 text-white hover:bg-red-900"
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
