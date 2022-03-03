import Board from "./Board";
import Keyboard from "./Keyboard";
import { useWordle } from "../wordle.hooks";

export default function Wordle() {
  const { state, send } = useWordle();

  return (
    <>
      <Board />
      <Keyboard />

      {state.value === "lost" && (
        <button type="button" onClick={() => send("reset")} className="Reset">
          Try Again
        </button>
      )}
    </>
  );
}
