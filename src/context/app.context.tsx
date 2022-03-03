import { createContext } from "react";
import { useInterpret } from "@xstate/react";
import { wordleMachine } from "../wordle/wordle.machine";
import { InterpreterFrom } from "xstate";

export const GlobalStateContext = createContext({
  wordleService: {} as InterpreterFrom<typeof wordleMachine>,
});

export const GlobalStateProvider = (props: any) => {
  const wordleService = useInterpret(wordleMachine);

  return (
    <GlobalStateContext.Provider value={{ wordleService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
