import "./App.css";
import Wordle from "./components/Wordle";
import { GlobalStateProvider } from "./context/app.context";

function App() {
  return (
    <div className="App">
      <header className="App-header">Wordle</header>

      <GlobalStateProvider>
        <Wordle />
      </GlobalStateProvider>
    </div>
  );
}

export default App;
