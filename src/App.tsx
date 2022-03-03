import "./App.css";
import Wordle from "./components/Wordle";
import { inspect } from "@xstate/inspect";

inspect({
  iframe: false,
  url: "https://stately.ai/viz?inspect",
});

function App() {
  return (
    <div className="App">
      <header className="App-header">Wordle</header>
      <Wordle />
    </div>
  );
}

export default App;
