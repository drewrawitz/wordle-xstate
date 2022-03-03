import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">Wordle</header>
      <Board />
      <Keyboard />
    </div>
  );
}

export default App;
