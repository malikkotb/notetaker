import { useState } from "react";

function NoteTitle() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [inputTitle, setInputTitle] = useState("Enter Title");

  const handleClick = () => {
    console.log("p tag clicked");
    setInputVisible(!isInputVisible);
  };

  // when the input field loses focus, this method is executed
  const handleBlur = () => {
    //TODO: save the Note Title in backend
    console.log("Input field lost focus.");
    setInputVisible(false);
  };

  const handleChangeTitle = (event) => {
    setInputTitle(event.target.value);
  };

  return (
    <>
      {isInputVisible ? (
        <div className="text-center">
          <input
            type="text"
            value={inputTitle}
            autoFocus
            onBlur={handleBlur}
            onChange={handleChangeTitle}
            className="px-2 py-0 text-xl font-bold"
          />
        </div>
      ) : (
        <div className="text-center">
          <p
            onClick={handleClick}
            className="inline-block cursor-pointer text-xl font-bold"
          >
            {inputTitle}
          </p>
        </div>
      )}
    </>
  );
}

export default NoteTitle;
