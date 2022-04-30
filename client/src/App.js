import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";

function App() {
  return (
    <div className="flex-1 w-3/4">
      <div className="align-items-center flex">
        <div className="flex-none w-64 bg-red-500">
          <Hello />
        </div>
        <div className="flex-1 bg-yellow-400">
          <Hello />
        </div>
      </div>
    </div>
  );
}

export default App;
