import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../context/app.context";

function useWordle() {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.wordleService);
  const { send } = globalServices.wordleService;

  return {
    state,
    send,
  };
}

export { useWordle };
