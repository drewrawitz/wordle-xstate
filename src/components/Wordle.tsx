import { useMachine } from "@xstate/react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import { wordleMachine } from "../machines/wordle";

export default function Wordle() {
  const [state, send] = useMachine(wordleMachine, {
    devTools: true,
  });

  console.log(state);

  return (
    <>
      <Board />
      <Keyboard />
    </>
  );
}
