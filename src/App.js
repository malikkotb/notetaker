import "./App.css";
import NoteNavigator from "./components/NoteNavigator";
import NoteWriting from "./components/NoteWriting";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* Main Left Column */}
        <div className="w-2/5">
          {/* Nested Columns Inside the Left Column */}
          <div className="flex h-screen">
            <div className="w-1/3 bg-indigo-400 p-4">
              <Sidebar />
            </div>
            <div className="w-2/3 bg-gray-100 p-4">
              {/* Notes Look Through Page */}
              <NoteNavigator />
            </div>
          </div>
        </div>
        {/* Main Right Column */}
        <div className="w-3/5 bg-white p-4">
          {/* Where the writing of the note will be */}
          <NoteWriting />
        </div>
      </div>

    </>
  );
}

export default App;
